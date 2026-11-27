import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { EnvData } from 'src/envData/envData.service';
import { UfService } from '../uf/uf.service';
import { RedisService } from 'src/redisService';
import { JwtServices } from 'src/jwt.services';

const client = process.env.CLIENTCODE;
const tenant = process.env.TENANT;
const ag = process.env.APPGROUPCODE;
const app = process.env.APPCODE;

@Injectable()
export class FusionAuthService {
  constructor(
    private readonly envData: EnvData,
    private readonly ufService: UfService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtServices,
  ) {}

  private async fa(
    path: string,
    method: 'GET' | 'POST',
    tenantId: string,
    body?: unknown,
  ) {
    const fusionAuthBaseUrl = this.envData.getFusionAuthBaseUrl();
    const fusionAuthApiKey = this.envData.getFusionAuthApiKey();
    const res = await fetch(`${fusionAuthBaseUrl}${path}`, {
      method,
      headers: {
        Authorization: fusionAuthApiKey,
        'X-FusionAuth-TenantId': tenantId,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    return { status: res.status, ok: res.ok, data };
  }

  async sendOtp(phoneNumber: string) {
    const fusionAuthDetails = await this.ufService.getFusionAuthCredentials(
      undefined,
      true,
    );
    // 1. find user by loginId
    let userId: string;
    const found = await this.fa(
      `/api/user?loginId=${encodeURIComponent(phoneNumber)}`,
      'GET',
      fusionAuthDetails.tenantUniqueId,
    );

    if (found.ok) {
      userId = found.data.user.id;
    } else if (found.status === 404) {
      // 2. create user
      const created = await this.fa(
        '/api/user',
        'POST',
        fusionAuthDetails.tenantUniqueId,
        {
          user: {
            username: phoneNumber,
            mobilePhone: phoneNumber,
            phoneNumber: phoneNumber,
            tenantId: fusionAuthDetails.tenantUniqueId,
          },
          sendSetPasswordEmail: false,
          skipVerification: true,
        },
      );
      if (!created.ok)
        throw new InternalServerErrorException('User creation failed');
      userId = created.data.user.id;
    } else {
      throw new InternalServerErrorException('User lookup failed');
    }

    // 3. register to application (400 usually means already registered)
    const reg = await this.fa(
      `/api/user/registration/${userId}`,
      'POST',
      fusionAuthDetails.tenantUniqueId,
      {
        registration: {
          applicationId: fusionAuthDetails.applicationId,
          data: {
            tenant: tenant,
            ag: ag,
            app: app,
            client: client,
            tenantId: tenant,
            userCode: '',
          },
        },
      },
    );
    if (!reg.ok && reg.status !== 400) {
      throw new InternalServerErrorException('Registration failed');
    }

    // 4. start passwordless
    const start = await this.fa(
      '/api/passwordless/start',
      'POST',
      fusionAuthDetails.tenantUniqueId,
      {
        applicationId: fusionAuthDetails.applicationId,
        loginId: phoneNumber,
        loginIdTypes: ['phoneNumber'],
      },
    );
    if (!start.ok)
      throw new InternalServerErrorException('Could not start OTP');

    // 5. ask FusionAuth to deliver it
    const send = await this.fa(
      '/api/passwordless/send',
      'POST',
      fusionAuthDetails.tenantUniqueId,
      {
        code: start.data.code,
      },
    );
    if (!send.ok) throw new InternalServerErrorException('Could not send OTP');

    await this.redisService.set(
      `${tenant}_${ag}_${app}_fa_pwless:${phoneNumber}`,
      JSON.stringify({ code: start.data.code, otp: start.data.oneTimeCode }),
    );

    return { message: 'OTP sent' }; // never return start.data.code
  }

  async verifyOtp(phoneNumber: string, otp: string) {
    const fusionAuthDetails = await this.ufService.getFusionAuthCredentials(
      undefined,
      true,
    );
    const raw = await this.redisService.get(`${tenant}_${ag}_${app}_fa_pwless:${phoneNumber}`);
    if (!raw) throw new UnauthorizedException('Invalid or expired OTP');
    const { code } = JSON.parse(raw);
    const res = await this.fa(
      '/api/passwordless/login',
      'POST',
      fusionAuthDetails.tenantUniqueId,
      { code, oneTimeCode: otp },
    );
    if (!res.ok) throw new UnauthorizedException('Invalid or expired OTP');
    await this.redisService.del(`fa_pwless:${phoneNumber}`);

    const { token, refreshToken, user } = res.data;
    const createUserResult = await this.createUserInAuthTables(
      user,
      token,
      refreshToken,
    ); // create user in auth tables if not exists
    return { token, refreshToken, user };
  }

  async createUserInAuthTables(user: any, token: string, refreshToken: string) {
    try {
      const schemaName = new URL(process.env.PG_URL).searchParams.get('schema');
      const userExistQuery = `select org_tu_id from ${schemaName}.tam_tenant_user where user_unique_id = $1 and tenant_code = $2`;
      const userExistResult = await this.ufService.query(userExistQuery, [
        user.id,
        tenant,
      ]);
      let org_tu_id = '';
      if (!userExistResult.length) {
        const user_data = {
          user_unique_id: user.id,
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          login_id: user.username,
          user_code: '',
          status: 'active',
          tenant_code: tenant,
          trs_created_by: user.username,
          trs_tenant_id: tenant,
        };
        const createUserResult = await this.ufService.insertIntoTable(
          'tam_tenant_user',
          user_data,
        );
        org_tu_id = createUserResult.data[0]?.org_tu_id;
      } else {
        org_tu_id = userExistResult?.[0]?.org_tu_id;
      }
      const userExistInAppTableQuery = `select org_tu_id from ${schemaName}.tam_app_user where org_tu_id = $1 and tenant_code = $2 and ag_code =$3 and app_code = $4`;
      const userExistInAppTableResult = await this.ufService.query(
        userExistInAppTableQuery,
        [org_tu_id, tenant, ag, app],
      );

      //appUser and session creation

      let createAppUserResult;
      const decoded = await this.jwtService.verifyToken(token);
      const sessionListCacheKey = `CK:TGA:FNGK:SETUP:FNK:SF:CATK:${tenant}:AFGK:${ag}:AFK:${app}:AFVK:v1:session`;

      if (!userExistInAppTableResult.length) {
        const app_user_data = {
          user_unique_id: user.id,
          no_of_products_service: '',
          access_profile: [],
          is_app_admin: false,
          last_active: '',
          access_expires: '',
          tenant_code: tenant,
          ag_code: ag,
          app_code: app,
          org_tu_id: org_tu_id,
          trs_created_by: user.username,
          trs_tenant_id: tenant,
        };
        createAppUserResult = await this.ufService.insertIntoTable(
          'tam_app_user',
          app_user_data,
        );

        await this.ufService.addSession(
          {
            accessToken: token,
            sid: decoded.sid,
            refreshToken,
            refreshTokenId: decoded.sid,
            createdOn: new Date().toISOString(),
          },
          sessionListCacheKey,
        );

        return createAppUserResult;
      }

      await this.ufService.addSession(
        {
          accessToken: token,
          sid: decoded.sid,
          refreshToken,
          refreshTokenId: decoded.sid,
          createdOn: new Date().toISOString(),
        },
        sessionListCacheKey,
      );

      return createAppUserResult;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Could not create user in auth tables',
      );
    }
  }

  async createOrUpdateUser(payload: any, token: string) {
    try {
      if (!token) {
        throw new UnauthorizedException('Authorization token is missing');
      }
      const decoded = await this.jwtService.verifyToken(token);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Could not complete registration process',
      );
    }
  }
}
