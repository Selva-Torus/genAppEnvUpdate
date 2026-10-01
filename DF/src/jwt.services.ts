import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from './redisService';
import { EnvData } from './envData/envData.service';
import {
  FusionAuthGetApplicationList,
  FusionAuthGetTenantList,
  introspectFAToken,
} from './fusionAuth.api';
import { BadRequestException, CustomException } from './customException';

const tenant = process.env.TENANT;
const ag = process.env.APPGROUPCODE;
const app = process.env.APPCODE;
const sessionListCacheKey = `CK:TGA:FNGK:SETUP:FNK:SF:CATK:${tenant}:AFGK:${ag}:AFK:${app}:AFVK:v1:session`;
const claimsCacheTTL = 5 * 60 * 1000; // 5 minutes

@Injectable()
export class JwtServices {
  private claimsCache = new Map<string, { claims: any; timestamp: number }>();
  private claimsFetchInFlight = new Map<string, Promise<any>>();
  private ApplicationId = '';
  private TenantUniqueId = '';

  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly envData: EnvData,
  ) {
    // Periodically drop expired entries so tokens that are never looked
    // up again don't sit in the Map forever.
    setInterval(() => this.pruneExpiredClaims(), claimsCacheTTL).unref();
  }

  private pruneExpiredClaims() {
    const now = Date.now();
    for (const [token, entry] of this.claimsCache) {
      if (now - entry.timestamp >= claimsCacheTTL) {
        this.claimsCache.delete(token);
      }
    }
  }

  getConfig(): { fusionAuthBaseUrl: string; fusionAuthApiKey: string } {
    return {
      fusionAuthBaseUrl: this.envData.getFusionAuthBaseUrl(),
      fusionAuthApiKey: this.envData.getFusionAuthApiKey(),
    };
  }

  async throwCustomException(error: any) {
    if (error instanceof CustomException) {
      throw error; // Re-throw the specific custom exception
    }
    throw new CustomException(
      'An unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async getTenantAndApplicationFusionAuthIdSecret() {
    try {
      let tenantUniqueId = '';
      const { fusionAuthBaseUrl, fusionAuthApiKey } = this.getConfig();

      const possible_FA_tenant_name = `${tenant}-Tenant`;
      // CHECK EXISTENCE OF THE APPLICATION TENANT IN FUSIONAUTH
      const tenantList = await FusionAuthGetTenantList({
        name: possible_FA_tenant_name,
        fusionAuthBaseUrl: fusionAuthBaseUrl,
        fusionAuthApiKey: fusionAuthApiKey,
      });
      if (tenantList.length > 0) {
        tenantUniqueId = tenantList[0]?.id;
      } else {
        throw new Error('Tenant not registered in FusionAuth');
      }
      // step 2 => check for application existence , create if not exist and return application id
      const possibleApplicationNameInFusionAuth = `${tenant}-defaultApplication`;
      const applicationList = await FusionAuthGetApplicationList(
        tenantUniqueId,
        {
          fusionAuthBaseUrl: fusionAuthBaseUrl,
          fusionAuthApiKey: fusionAuthApiKey,
          name: possibleApplicationNameInFusionAuth,
        },
      );
      const existingApplication = applicationList.find(
        (a) => a.name == possibleApplicationNameInFusionAuth,
      );
      if (!existingApplication) {
        throw new BadRequestException(
          'Application not registered in FusionAuth',
        );
      } else {
        return {
          tenantUniqueId,
          applicationId: existingApplication?.id,
          fusionAuthAppClientSecret:
            existingApplication?.oauthConfiguration?.clientSecret,
        };
      }
    } catch (error) {
      await this.throwCustomException(error);
    }
  }

  private async fetchClaimsFromFusionAuth(token: string): Promise<any> {
    try {
      return await introspectFAToken({
        fusionAuthApplicationId: this.ApplicationId,
        fusionAuthTenantId: this.TenantUniqueId,
        token: token,
        fusionAuthBaseUrl: this.envData.getFusionAuthBaseUrl(),
      });
    } catch (error) {
      return { active: false };
    }
  }

  // Cached claims lookup with a 5-minute TTL. Concurrent calls for the same
  // token share one in-flight introspection request instead of each firing
  // their own call to FusionAuth.
  private async getClaims(token: string): Promise<any> {
    const cachedClaims = this.claimsCache.get(token);
    if (cachedClaims) {
      if (Date.now() - cachedClaims.timestamp < claimsCacheTTL) {
        return cachedClaims.claims;
      }
      this.claimsCache.delete(token);
    }

    const inFlight = this.claimsFetchInFlight.get(token);
    if (inFlight) {
      return inFlight;
    }

    const fetchPromise = this.fetchClaimsFromFusionAuth(token)
      .then((claims) => {
        // Only cache genuinely active sessions — a bad/expired token
        // shouldn't be remembered as invalid past its real state.
        if (claims?.active) {
          this.claimsCache.set(token, { claims, timestamp: Date.now() });
        }
        return claims;
      })
      .finally(() => {
        this.claimsFetchInFlight.delete(token);
      });

    this.claimsFetchInFlight.set(token, fetchPromise);
    return fetchPromise;
  }

  // Signature + expiry verified — use this wherever the decoded claims drive
  // an authorization/identity decision. decodeToken() below trusts nothing.
  async verifyToken(token: string): Promise<any> {
    try {
      if (!this.ApplicationId || !this.TenantUniqueId) {
        const { applicationId, tenantUniqueId } =
          await this.getTenantAndApplicationFusionAuthIdSecret();
        this.ApplicationId = applicationId;
        this.TenantUniqueId = tenantUniqueId;
      }

      const claims = await this.getClaims(token);

      if (!claims?.sid || !claims?.active) {
        // No sid on the token means we have nothing to check the session
        // list against — fail closed rather than silently skip the check.
        throw new Error('Invalid or expired token');
      }

      // Auth token verification on the basis of application session list bypassed
      // const isActive = await this.isSessionActive(claims.sid);
      // if (!isActive) {
      //  throw new Error('Invalid or expired token');
      // }
      return claims;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  private async isSessionActive(sid: string): Promise<boolean> {
    try {
      const sessionListCache = await this.redisService.getJsonData(
        sessionListCacheKey,
        process.env.CLIENTCODE,
      );
      const sessionList =
        sessionListCache && JSON.parse(sessionListCache)
          ? JSON.parse(sessionListCache)
          : [];

      if (!Array.isArray(sessionList) || !sessionList.length) {
        return false;
      }

      return sessionList.some((item: any) => item?.sid == sid);
    } catch (error) {
      // If the session store can't be read, fail closed — don't let a
      // Redis hiccup silently grant access.
      return false;
    }
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token, { json: true });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
