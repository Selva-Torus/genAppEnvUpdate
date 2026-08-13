import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'pg';
import { RedisService } from './redisService';

const tenant = process.env.TENANT;
const ag = process.env.APPGROUPCODE;
const app = process.env.APPCODE;
const sessionListCacheKey = `CK:TGA:FNGK:SETUP:FNK:SF:CATK:${tenant}:AFGK:${ag}:AFK:${app}:AFVK:v1:session`;

@Injectable()
export class JwtServices {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async getPublicKeyFromDB(): Promise<string> {
    try {
      const dbUrl = new URL(process.env.DATABASE_URL);
      dbUrl.pathname = "/fusionauth";
      const client = new Client({
        connectionString: dbUrl.toString(),
        application_name: `${tenant}_${ag}_${app}_auth_verify_service`,
        database: 'fusionauth',
        connectionTimeoutMillis: 30000,
      });
      await client.connect();
      const query = `SELECT k.public_key FROM public.applications a JOIN public."keys" k
            ON k.id = a.access_token_signing_keys_id WHERE a.name = $1`;
      const result = await client.query(query, [`${tenant}-defaultApplication`]);
      client.end();
      return result.rows[0].public_key;
    } catch (error) {
      throw new Error('Failed to retrieve public key from database');
    }
  }

  // Signature + expiry verified, AND now checked against the same
  // sessionList that logout() prunes. Previously that list was write-only
  // from verifyToken's point of view — removing a sid at logout had zero
  // effect on whether future requests with that JWT were accepted. This
  // is the fix: a token is only valid if its sid is still present here.
  async verifyToken(token: string): Promise<any> {
    let claims: any;
    try {
      const publicKey = await this.getPublicKeyFromDB();
      claims = this.jwtService.verify(token, {
        algorithms: ['RS256'],
        publicKey,
      });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }

    if (!claims?.sid) {
      // No sid on the token means we have nothing to check the session
      // list against — fail closed rather than silently skip the check.
      throw new Error('Invalid or expired token');
    }

    const isActive = await this.isSessionActive(claims.sid);
    if (!isActive) {
      throw new Error('Invalid or expired token');
    }

    return claims;
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