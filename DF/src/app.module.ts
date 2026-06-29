
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common.Service';
import { RuleService } from './ruleService';
import { CodeService } from './codeService';
import { RedisService } from './redisService';
import { JwtService } from '@nestjs/jwt';
import { UfModule } from './Torus/v1/uf/uf.module';
import { TeModule } from './Torus/v1/te/te.module';
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { ErdModule } from './erd/erd.module';
import { DFcomboCurrencySearchModule } from './dfd/DFcomboCurrencySearch/v1/DFcomboCurrencySearch.module';    
import { DFtransactionModule } from './dfd/DFtransaction/v1/DFtransaction.module';    
import { DFprocessStatusComboSearchModule } from './dfd/DFprocessStatusComboSearch/v1/DFprocessStatusComboSearch.module';    
import { DFchannelComboSearchModule } from './dfd/DFchannelComboSearch/v1/DFchannelComboSearch.module';    
import { DFjourneyModule } from './dfd/DFjourney/v1/DFjourney.module';    
import { changeStatusTranUpdateLogInsertModule } from './pfd/changeStatusTranUpdateLogInsert/v1/changeStatusTranUpdateLogInsert.module';    
//import { DecryptPayloadMiddleware } from './decryptPayloadMiddleware';
import { EncryptInterceptor } from './encryptInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';
import { PersistenceService } from './persistence.service';


@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT)       
      },
    }),
  CacheModule.register({isGlobal:true}),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFcomboCurrencySearchModule,DFtransactionModule,DFprocessStatusComboSearchModule,DFchannelComboSearchModule,DFjourneyModule,changeStatusTranUpdateLogInsertModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,RedisService,ConfigService,EnvData,PersistenceService,{
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    }],
})
export class AppModule implements NestModule {
  configure() {}
}
