
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { applyPgSslMode } from '../db-ssl.util';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    const url = new URL(process.env.DATABASE_URL);
    // M11: negotiate TLS by default (falls back to plaintext if the target
    // Postgres doesn't support it — see db-ssl.util.ts). Override with
    // DATABASE_SSL_MODE=require/verify-full once the DB is TLS-capable.
    applyPgSslMode(url, 'DATABASE_SSL_MODE');
    url.searchParams.set('application_name', 'ct005_gss_vgph_v1_df');
    // lazy: true — Prisma will NOT open a connection until the first query
    super({ datasources: { db: { url: url.toString() } } });
  }

  /**
   * Connects, runs the operation, then disconnects.
   * Use this in service methods that need an isolated connection lifecycle.
   */
  async withConnection<T>(operation: () => Promise<T>): Promise<T> {
    await this.$connect();
    try {
      return await operation();
    } finally {
      await this.$disconnect();
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}