import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvData {
  private config: any = null;
  private isLoaded: boolean = false;

  setConfig(data: any): void {
    if (this.isLoaded) return;
    this.config = JSON.parse(JSON.stringify(data));
    Object.freeze(this.config);
    this.isLoaded = true;
  }

  async setEndDetails(data: any): Promise<void> {
    this.setConfig(data);
  }

  isConfigLoaded(): boolean {
    return this.isLoaded;
  }

  async getEndDetails(): Promise<any> {
    if (!this.isLoaded) {
      throw new Error('Configuration not loaded yet');
    }
    return JSON.parse(JSON.stringify(this.config));
  }

  private getConfigValue(path: string): any {
    if (!this.isLoaded) throw new Error('Config not loaded');
    return path.split('.').reduce((obj, key) => obj?.[key], this.config);
  }

    // ===== Tenant / App / Group / Version ===== 
  getBeUrl(): string {
    return this.getConfigValue('api.release.HOST') || '';
  }

  getApiUrl(): string {
    return this.getConfigValue('api.debug.HOST') || '';
  }

  // ===== BUILD INFO =====
  getBuildType(): string {
    return this.getConfigValue('buildType.value') || 'Dev';
  }

  getApplicationDbType(): string {
    return this.getConfigValue('applicationDBType.value') || 'postgres';
  }

  getFileServerHost(): string {
    return this.getConfigValue('fileServer.HOST') || '';
  }

  // Seaweed - returns ready-to-use URL
  getSeaweedOutputHost(): string {
    return this.getConfigValue('dfs.seaweed.HOST') || '';
  }

  getFtpOutputHost(): string {
    return this.getConfigValue('dfs.seaweedS3.HOST') || '';
  }

  getSeaweedUsername(): string {
    return this.getConfigValue('dfs.seaweed.USERNAME') || '';
  }

  getSeaweedPassword(): string {
    return this.getConfigValue('dfs.seaweed.PASSWORD') || '';
  }

  getSeaweedS3AccessKey(): string {
    return this.getConfigValue('dfs.seaweedS3.ACCESS_KEY') || '';
  }

  getSeaweedS3SecretKey(): string {
    return this.getConfigValue('dfs.seaweedS3.SECRET_KEY') || '';
  }

  getSeaweedS3BucketName(): string {
    return this.getConfigValue('dfs.seaweedS3.BUCKET_NAME') || '';
  }

  // ===== REDIS =====
  getRedisHost(): string {
    return this.getConfigValue('amdPersistence.redis.REDIS_HOST') || '';
  }

  getRedisPort(): string {
    return this.getConfigValue('amdPersistence.redis.REDIS_PORT') || '';
  }

  getRedisUsername(): string {
    return this.getConfigValue('amdPersistence.redis.REDIS_USERNAME') || '';
  }

  getRedisPassword(): string {
    return this.getConfigValue('amdPersistence.redis.REDIS_PASSWORD') || '';
  }

  // ===== MONGO =====
  getMongoUrl(): string {
    const m = this.getConfigValue('amdPersistence.mongo');
    if (!m) return '';
    return `mongodb://${m.USERNAME}:${m.PASSWORD}@${m.HOST}:${m.PORT}/${m.DATABASENAME}?authSource=admin&directConnection=true`;
  }

  getMongoDbName(): string {
    return this.getConfigValue('amdPersistence.mongo.DATABASENAME') || '';
  }

  // ===== POSTGRES =====
  getDatabaseUrl(): string {
    const dbType = this.getApplicationDbType().toLowerCase();

    switch (dbType) {
      case 'postgres': {
        const pg = this.getConfigValue('postgres');
        if (!pg) return '';
        return `postgresql://${pg.POSTGRES_USERNAME}:${pg.POSTGRES_PASSWORD}@${pg.POSTGRES_HOST}:${pg.POSTGRES_PORT}/${pg.POSTGRES_DATABASENAME}?schema=${pg.POSTGRES_SCHEMANAME || 'public'}`;
      }

      case 'mongodb': {
        const m = this.getConfigValue('mongodb');
        if (!m) return '';
        return `mongodb://${m.MONGODB_USERNAME}:${m.MONGODB_PASSWORD}@${m.MONGODB_HOST}:${m.MONGODB_PORT}/${m.MONGODB_DATABASENAME}?authSource=admin&directConnection=true`;
      }

      case 'mysql': {
        const mysql = this.getConfigValue('mysql');
        if (!mysql || !mysql.MYSQL_HOST) return '';
        return `mysql://${mysql.MYSQL_USERNAME}:${mysql.MYSQL_PASSWORD}@${mysql.MYSQL_HOST}:${mysql.MYSQL_PORT}/${mysql.MYSQL_DATABASENAME}`;
      }

      case 'oracle': {
        const o = this.getConfigValue('oracle');
        if (!o) return '';
        return `oracle://${o.ORACLE_USERNAME}:${o.ORACLE_PASSWORD}@${o.ORACLE_HOST}:${o.ORACLE_PORT}/${o.ORACLE_SERVICENAME}`;
      }

      default:
        return '';
    }
  }

  getPostgresConfig(): { host: string; port: string; database: string; schema: string } | null {
    const pg = this.getConfigValue('postgres');
    if (!pg) return null;
    return {
      host: pg.POSTGRES_HOST,
      port: pg.POSTGRES_PORT,
      database: pg.POSTGRES_DATABASENAME,
      schema: pg.POSTGRES_SCHEMANAME || 'public'
    };
  }

  // ===== FILESERVER =====
  getFileServerPort(): string {
    return this.getConfigValue('fileServer.PORT') || '';
  }

  getFileServerPath(): string {
    return this.getConfigValue('fileServer.PATH') || '';
  }

  getFileServerVarnishUrl(): string {
    return this.getConfigValue('fileServer.VarnishURL') || '';
  }

  // ===== GITHUB =====
  getGitRepoUrl(): string {
    return this.getConfigValue('github.GITREPO_URL') || '';
  }

  getGitRepoUsername(): string {
    return this.getConfigValue('github.GITREPO_USERNAME') || '';
  }

  getGitRepoToken(): string {
    return this.getConfigValue('github.GITREPO_TOKEN') || '';
  }

  // ===== JENKINS =====
  getJenkinsUrl(): string {
    return this.getConfigValue('jenkins.JENKINS_URL') || '';
  }

  getJenkinsUsername(): string {
    return this.getConfigValue('jenkins.JENKINS_USERNAME') || '';
  }

  getJenkinsToken(): string {
    return this.getConfigValue('jenkins.JENKINS_TOKEN') || '';
  }

  // ===== ENCRYPTION =====
  getEncryptionType(): string {
    return this.getConfigValue('encryption.encryptionType.value') || '';
  }

  getEncryptionInfo(): any[] {
    return this.getConfigValue('encryption.encryptionInfo.items') || [];
  }

  // ===== FUSIONAUTH =====
  getFusionAuthBaseUrl(): string {
    return this.getConfigValue('iam.fusionAuth.host') || '';
  }

  getFusionAuthApiKey(): string {
    return this.getConfigValue('iam.fusionAuth.apiKey') || '';
  }

  // ===== KAFKA =====
  getKafkaBroker(): string {
    const broker = this.getConfigValue('kafka.brokers.items[0]');
    if (!broker) return '';
    return `${broker.host}:${broker.port}`;
  }

  getKafkaClientId(): string {
    return this.getConfigValue('kafka.client_id') || '';
  }

  // ===== EXTERNAL CONNECTORS =====
  getExternalDbConnectors(): any[] {
    return this.getConfigValue('externalConnectors-DB.items') || [];
  }

  getExternalFileConnectors(): any[] {
    return this.getConfigValue('externalConnectors-FILE.items') || [];
  }

  getExternalStreamConnectors(): any[] {
    return this.getConfigValue('externalConnectors-STREAM.items') || [];
  }
}