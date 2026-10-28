
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common.Service';
import { RuleService } from './ruleService';
import { CodeService } from './codeService';
import { RedisService } from './redisService';
import { JwtService } from '@nestjs/jwt';
import { JwtServices } from "src/jwt.services";
import { UfModule } from './Torus/v1/uf/uf.module';
import { TeModule } from './Torus/v1/te/te.module';
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { ErdModule } from './erd/erd.module';
import { CdcPrismaService } from './erd/cdc_prisma.service';
import { DFclaimsModule } from './dfd/DFclaims/v1/DFclaims.module';    
import { DFcode_descriptionModule } from './dfd/DFcode_description/v1/DFcode_description.module';    
import { DFclaims_detailModule } from './dfd/DFclaims_detail/v1/DFclaims_detail.module';    
import { DFcard_dataModule } from './dfd/DFcard_data/v1/DFcard_data.module';    
import { DFclaim_table_dataModule } from './dfd/DFclaim_table_data/v1/DFclaim_table_data.module';    
import { DFchart_dataModule } from './dfd/DFchart_data/v1/DFchart_data.module';    
import { PFPProcess_Fabric_For_ReimfastModule } from './pfd/PFPProcess_Fabric_For_Reimfast/v1/PFPProcess_Fabric_For_Reimfast.module';    
import { EncryptInterceptor } from './encryptInterceptor';
import { DecryptInterceptor } from './decryptInterceptor';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';
import { PersistenceService } from './persistence.service';
import { SwaggerGuard } from './swagger.guard';
import { AuthGuard } from './auth.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { getRedisConnectionOptions } from './redis.config';


@Module({
  imports: [
    BullModule.forRoot({
      connection: getRedisConnectionOptions(),
    }),
  CacheModule.register({isGlobal:true}),
   ThrottlerModule.forRoot({
    throttlers: [
      { name: 'default', ttl: 10_000, limit: 120 }
    ],
  }),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFclaimsModule,DFcode_descriptionModule,DFclaims_detailModule,DFcard_dataModule,DFclaim_table_dataModule,DFchart_dataModule,PFPProcess_Fabric_For_ReimfastModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,JwtServices,RedisService,ConfigService,EnvData,PersistenceService,SwaggerGuard, {
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: DecryptInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard
    },CdcPrismaService],
})
export class AppModule implements NestModule {
  configure() {}
}
