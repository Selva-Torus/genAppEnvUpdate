import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'pg';

const tenant = process.env.TENANT;
const ag = process.env.APPGROUPCODE;
const app = process.env.APPCODE;

@Injectable()
export class JwtServices {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async getPublicKeyFromDB(): Promise<string> {
    try {
      const dbUrl = new URL(process.env.DATABASE_URL);
      dbUrl.pathname = "/fusionauth";

      const client = new Client({
        connectionString: dbUrl.toString(),
        application_name: `${tenant}_${ag}_${app}_auth_verify_service`,
        database: 'fusionauth',
        connectionTimeoutMillis: 30000, // fail fast if can't connect in 5s
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

  // Signature + expiry verified — use this wherever the decoded claims drive
  // an authorization/identity decision. decodeToken() below trusts nothing.
  async verifyToken(token: string): Promise<any> {
    try {
      const publicKey = await this.getPublicKeyFromDB();
      return this.jwtService.verify(token, {
        algorithms: ['RS256'],
        publicKey,
      });
    } catch (error) {
      throw new Error('Invalid or expired token');
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