
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common.Service';
import { RuleService } from './ruleService';
import { CodeService } from './codeService';
import { RedisService } from './redisService';
import { JwtService } from '@nestjs/jwt';
import { MongoService } from './mongoService';
import { UfModule } from './Torus/v1/uf/uf.module';
import { TeModule } from './Torus/v1/te/te.module';
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { ErdModule } from './erd/erd.module';
import { DFclaimsModule } from './dfd/DFclaims/v1/DFclaims.module';    
import { DFcode_descriptionModule } from './dfd/DFcode_description/v1/DFcode_description.module';    
import { DFclaims_detailModule } from './dfd/DFclaims_detail/v1/DFclaims_detail.module';    
import { DFcard_dataModule } from './dfd/DFcard_data/v1/DFcard_data.module';    
import { DFclaim_table_dataModule } from './dfd/DFclaim_table_data/v1/DFclaim_table_data.module';    
import { DFchart_dataModule } from './dfd/DFchart_data/v1/DFchart_data.module';    
import { Process_Fabric_For_ReimfastModule } from './pfd/Process_Fabric_For_Reimfast/v1/Process_Fabric_For_Reimfast.module';    
//import { DecryptPayloadMiddleware } from './decryptPayloadMiddleware';
import { EncryptInterceptor } from './encryptInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { EnvDataModule } from './envData/envData.module';

@Module({
  imports: [
  CacheModule.register({isGlobal:true}),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFclaimsModule,DFcode_descriptionModule,DFclaims_detailModule,DFcard_dataModule,DFclaim_table_dataModule,DFchart_dataModule,Process_Fabric_For_ReimfastModule,ErdModule], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,RedisService,ConfigService,MongoService,{
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    }],
})
export class AppModule implements NestModule {
  configure() {}
}
