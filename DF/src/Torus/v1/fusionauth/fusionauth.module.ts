import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtServices } from 'src/jwt.services';
import { RedisService } from 'src/redisService';
import { ConfigService } from '@nestjs/config';
import { EnvData } from 'src/envData/envData.service';
import { FusionAuthController } from './fusionauth.controller';
import { FusionAuthService } from './fusionauth.service';
import { UfService } from '../uf/uf.service';
import { RuleService } from 'src/ruleService';
import { CommonService } from 'src/common.Service';
import { CodeService } from 'src/codeService';

@Module({
  imports: [JwtModule],
  controllers: [FusionAuthController],
  providers: [
    FusionAuthService,
    JwtModule,
    JwtServices,
    RedisService,
    ConfigService,
    UfService,
    EnvData,
    RuleService,
    CodeService,
    CommonService,
  ],
  exports: [FusionAuthService],
})
export class FusionAuthModule {}
