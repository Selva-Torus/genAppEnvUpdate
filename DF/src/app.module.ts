
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
import { DFadvance_searchModule } from './dfd/DFadvance_search/v1/DFadvance_search.module';    
import { DFcombo_dfdModule } from './dfd/DFcombo_dfd/v1/DFcombo_dfd.module';    
import { DFGroup_Array_dsdModule } from './dfd/DFGroup_Array_dsd/v1/DFGroup_Array_dsd.module';    
import { DFclaims_dfdModule } from './dfd/DFclaims_dfd/v1/DFclaims_dfd.module';    
import { DFset_whereModule } from './dfd/DFset_where/v1/DFset_where.module';    
import { DFchart_dataModule } from './dfd/DFchart_data/v1/DFchart_data.module';    
import { DFset_db_nodeModule } from './dfd/DFset_db_node/v1/DFset_db_node.module';    
import { Request_form_default_eventModule } from './pfd/Request_form_default_event/v1/Request_form_default_event.module';    
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
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFadvance_searchModule,DFcombo_dfdModule,DFGroup_Array_dsdModule,DFclaims_dfdModule,DFset_whereModule,DFchart_dataModule,DFset_db_nodeModule,Request_form_default_eventModule,ErdModule,], 
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
