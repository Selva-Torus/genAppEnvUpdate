
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
import { APITOB_Consent_Event_OperationModule } from './apiInt/APITOB_Consent_Event_Operation/v1/APITOB_Consent_Event_Operation.module';    
import { DFTOB_Consent_Request_CA_DFDModule } from './dfd/DFTOB_Consent_Request_CA_DFD/v1/DFTOB_Consent_Request_CA_DFD.module';    
import { DFMongo_TotalCalls_DFDModule } from './dfd/DFMongo_TotalCalls_DFD/v1/DFMongo_TotalCalls_DFD.module';    
import { DFMongo_API_Repository_DFDModule } from './dfd/DFMongo_API_Repository_DFD/v1/DFMongo_API_Repository_DFD.module';    
import { DFMongoDB_API_Process_Logs_DFDModule } from './dfd/DFMongoDB_API_Process_Logs_DFD/v1/DFMongoDB_API_Process_Logs_DFD.module';    
import { DFMongo_Pie_Chart_DFDModule } from './dfd/DFMongo_Pie_Chart_DFD/v1/DFMongo_Pie_Chart_DFD.module';    
import { DFMongo_LineChart_DFDModule } from './dfd/DFMongo_LineChart_DFD/v1/DFMongo_LineChart_DFD.module';    
import { DFTOB_Consents_Request_DFDModule } from './dfd/DFTOB_Consents_Request_DFD/v1/DFTOB_Consents_Request_DFD.module';    
import { DFMongoDB_MainDashboard_DFDModule } from './dfd/DFMongoDB_MainDashboard_DFD/v1/DFMongoDB_MainDashboard_DFD.module';    
import { DFTOB_Total_Used_API_DFDModule } from './dfd/DFTOB_Total_Used_API_DFD/v1/DFTOB_Total_Used_API_DFD.module';    
import { DFTOB_MZDSH_TotalCards_DFDModule } from './dfd/DFTOB_MZDSH_TotalCards_DFD/v1/DFTOB_MZDSH_TotalCards_DFD.module';    
import { DFTOB_MZDSH_Group_BarChart_DFDModule } from './dfd/DFTOB_MZDSH_Group_BarChart_DFD/v1/DFTOB_MZDSH_Group_BarChart_DFD.module';    
import { DFTOB_MZDSH_PieChart_DFDModule } from './dfd/DFTOB_MZDSH_PieChart_DFD/v1/DFTOB_MZDSH_PieChart_DFD.module';    
import { DFTOB_MZDSH_BarChart_OverageCharges_DFDModule } from './dfd/DFTOB_MZDSH_BarChart_OverageCharges_DFD/v1/DFTOB_MZDSH_BarChart_OverageCharges_DFD.module';    
import { DFTOB_MZDSH_PricingTierTable_DFDModule } from './dfd/DFTOB_MZDSH_PricingTierTable_DFD/v1/DFTOB_MZDSH_PricingTierTable_DFD.module';    
import { DFTOB_MZDSH_InVoice_Table_DFDModule } from './dfd/DFTOB_MZDSH_InVoice_Table_DFD/v1/DFTOB_MZDSH_InVoice_Table_DFD.module';    
import { TOB_Consent_Event_OperationModule } from './pfd/TOB_Consent_Event_Operation/v1/TOB_Consent_Event_Operation.module';    
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
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,APITOB_Consent_Event_OperationModule,DFTOB_Consent_Request_CA_DFDModule,DFMongo_TotalCalls_DFDModule,DFMongo_API_Repository_DFDModule,DFMongoDB_API_Process_Logs_DFDModule,DFMongo_Pie_Chart_DFDModule,DFMongo_LineChart_DFDModule,DFTOB_Consents_Request_DFDModule,DFMongoDB_MainDashboard_DFDModule,DFTOB_Total_Used_API_DFDModule,DFTOB_MZDSH_TotalCards_DFDModule,DFTOB_MZDSH_Group_BarChart_DFDModule,DFTOB_MZDSH_PieChart_DFDModule,DFTOB_MZDSH_BarChart_OverageCharges_DFDModule,DFTOB_MZDSH_PricingTierTable_DFDModule,DFTOB_MZDSH_InVoice_Table_DFDModule,TOB_Consent_Event_OperationModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,JwtServices,RedisService,ConfigService,EnvData,PersistenceService,SwaggerGuard, {
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: DecryptInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard
    }],
})
export class AppModule implements NestModule {
  configure() {}
}
