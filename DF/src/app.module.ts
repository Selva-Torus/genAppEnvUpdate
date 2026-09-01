
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
import { DFcomboCurrencySearchModule } from './dfd/DFcomboCurrencySearch/v1/DFcomboCurrencySearch.module';    
import { DFtransactionModule } from './dfd/DFtransaction/v1/DFtransaction.module';    
import { DFprocessStatusComboSearchModule } from './dfd/DFprocessStatusComboSearch/v1/DFprocessStatusComboSearch.module';    
import { DFchannelComboSearchModule } from './dfd/DFchannelComboSearch/v1/DFchannelComboSearch.module';    
import { DFjourneyModule } from './dfd/DFjourney/v1/DFjourney.module';    
import { DFproductDashboardModule } from './dfd/DFproductDashboard/v1/DFproductDashboard.module';    
import { DFchannelDashboardModule } from './dfd/DFchannelDashboard/v1/DFchannelDashboard.module';    
import { DFcurrencyDashboardModule } from './dfd/DFcurrencyDashboard/v1/DFcurrencyDashboard.module';    
import { DFonlineOfflineDashboardModule } from './dfd/DFonlineOfflineDashboard/v1/DFonlineOfflineDashboard.module';    
import { DFprocessCategoryDashboardModule } from './dfd/DFprocessCategoryDashboard/v1/DFprocessCategoryDashboard.module';    
import { DFtransactionCountVphDashboardModule } from './dfd/DFtransactionCountVphDashboard/v1/DFtransactionCountVphDashboard.module';    
import { DFchannelCountVphDashboardModule } from './dfd/DFchannelCountVphDashboard/v1/DFchannelCountVphDashboard.module';    
import { DFchannelChartDashboardModule } from './dfd/DFchannelChartDashboard/v1/DFchannelChartDashboard.module';    
import { DFproductChartDashboardModule } from './dfd/DFproductChartDashboard/v1/DFproductChartDashboard.module';    
import { DFonlineOfflineCountVPHDashboardModule } from './dfd/DFonlineOfflineCountVPHDashboard/v1/DFonlineOfflineCountVPHDashboard.module';    
import { changeStatusTranUpdateLogInsertModule } from './pfd/changeStatusTranUpdateLogInsert/v1/changeStatusTranUpdateLogInsert.module';    
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
      { name: 'default', ttl: 60_000, limit: 120 },
    ],
  }),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFcomboCurrencySearchModule,DFtransactionModule,DFprocessStatusComboSearchModule,DFchannelComboSearchModule,DFjourneyModule,DFproductDashboardModule,DFchannelDashboardModule,DFcurrencyDashboardModule,DFonlineOfflineDashboardModule,DFprocessCategoryDashboardModule,DFtransactionCountVphDashboardModule,DFchannelCountVphDashboardModule,DFchannelChartDashboardModule,DFproductChartDashboardModule,DFonlineOfflineCountVPHDashboardModule,changeStatusTranUpdateLogInsertModule,ErdModule,], 
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
