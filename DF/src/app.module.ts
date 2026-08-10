
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
import { DFamrQueueDashboardModule } from './dfd/DFamrQueueDashboard/v1/DFamrQueueDashboard.module';    
import { DFaddCaseModule } from './dfd/DFaddCase/v1/DFaddCase.module';    
import { DFdocTypeNameComboModule } from './dfd/DFdocTypeNameCombo/v1/DFdocTypeNameCombo.module';    
import { DFattorneysComboModule } from './dfd/DFattorneysCombo/v1/DFattorneysCombo.module';    
import { DFpriorityComboModule } from './dfd/DFpriorityCombo/v1/DFpriorityCombo.module';    
import { DFstatusComboModule } from './dfd/DFstatusCombo/v1/DFstatusCombo.module';    
import { DFamrChecklistComboModule } from './dfd/DFamrChecklistCombo/v1/DFamrChecklistCombo.module';    
import { DFDocTableModule } from './dfd/DFDocTable/v1/DFDocTable.module';    
import { DFamrChecklistStatusModule } from './dfd/DFamrChecklistStatus/v1/DFamrChecklistStatus.module';    
import { DFpendingFilingsDashboardModule } from './dfd/DFpendingFilingsDashboard/v1/DFpendingFilingsDashboard.module';    
import { DFcardsDashboardModule } from './dfd/DFcardsDashboard/v1/DFcardsDashboard.module';    
import { addCaseModifyModule } from './pfd/addCaseModify/v1/addCaseModify.module';    
import { addCaseModule } from './pfd/addCase/v1/addCase.module';    
//import { DecryptPayloadMiddleware } from './decryptPayloadMiddleware';
import { EncryptInterceptor } from './encryptInterceptor';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';
import { PersistenceService } from './persistence.service';
import { SwaggerGuard } from './swagger.guard';
import { AuthGuard } from './auth.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';


@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT)       
      },
    }),
  CacheModule.register({isGlobal:true}),
   ThrottlerModule.forRoot({
    throttlers: [
      { name: 'default', ttl: 60_000, limit: 120 },
    ],
  }),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFamrQueueDashboardModule,DFaddCaseModule,DFdocTypeNameComboModule,DFattorneysComboModule,DFpriorityComboModule,DFstatusComboModule,DFamrChecklistComboModule,DFDocTableModule,DFamrChecklistStatusModule,DFpendingFilingsDashboardModule,DFcardsDashboardModule,addCaseModifyModule,addCaseModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,JwtServices,JwtServices,RedisService,ConfigService,EnvData,PersistenceService,SwaggerGuard,{
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard
    },CdcPrismaService ],
})
export class AppModule implements NestModule {
  configure() {}
}
