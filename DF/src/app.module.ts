
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
import { DFtransactionModule } from './dfd/DFtransaction/v1/DFtransaction.module';    
import { DFforexCurrencyDropDownDfdModule } from './dfd/DFforexCurrencyDropDownDfd/v1/DFforexCurrencyDropDownDfd.module';    
import { DFrejectPopupDfdModule } from './dfd/DFrejectPopupDfd/v1/DFrejectPopupDfd.module';    
import { DFscanSaveProcessDfdModule } from './dfd/DFscanSaveProcessDfd/v1/DFscanSaveProcessDfd.module';    
import { DFcrBankCodeDropDownDfdModule } from './dfd/DFcrBankCodeDropDownDfd/v1/DFcrBankCodeDropDownDfd.module';    
import { DFdocumentListDfdModule } from './dfd/DFdocumentListDfd/v1/DFdocumentListDfd.module';    
import { DFerrorListDfdModule } from './dfd/DFerrorListDfd/v1/DFerrorListDfd.module';    
import { DFtransactionListDfdModule } from './dfd/DFtransactionListDfd/v1/DFtransactionListDfd.module';    
import { DFcommentListDfdModule } from './dfd/DFcommentListDfd/v1/DFcommentListDfd.module';    
import { DFjourneyModule } from './dfd/DFjourney/v1/DFjourney.module';    
import { DFreturnReasonDfdModule } from './dfd/DFreturnReasonDfd/v1/DFreturnReasonDfd.module';    
import { scanSaveProcessModule } from './pfd/scanSaveProcess/v1/scanSaveProcess.module';    
import { getSignatureInfoDetailsModule } from './pfd/getSignatureInfoDetails/v1/getSignatureInfoDetails.module';    
import { changeStatusTranUpdateLogInsertModule } from './pfd/changeStatusTranUpdateLogInsert/v1/changeStatusTranUpdateLogInsert.module';    
import { getAccountInfoDetailsModule } from './pfd/getAccountInfoDetails/v1/getAccountInfoDetails.module';    
import { rateCalculationProcessModule } from './pfd/rateCalculationProcess/v1/rateCalculationProcess.module';    
import { simulatorProcessModule } from './pfd/simulatorProcess/v1/simulatorProcess.module';    
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
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFtransactionModule,DFforexCurrencyDropDownDfdModule,DFrejectPopupDfdModule,DFscanSaveProcessDfdModule,DFcrBankCodeDropDownDfdModule,DFdocumentListDfdModule,DFerrorListDfdModule,DFtransactionListDfdModule,DFcommentListDfdModule,DFjourneyModule,DFreturnReasonDfdModule,scanSaveProcessModule,getSignatureInfoDetailsModule,changeStatusTranUpdateLogInsertModule,getAccountInfoDetailsModule,rateCalculationProcessModule,simulatorProcessModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,JwtServices,RedisService,ConfigService,EnvData,PersistenceService,SwaggerGuard,{
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
