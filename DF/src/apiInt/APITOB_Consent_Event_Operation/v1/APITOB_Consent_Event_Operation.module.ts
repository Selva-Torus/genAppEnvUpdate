
import { Module } from '@nestjs/common';
import { APITOB_Consent_Event_OperationController } from './APITOB_Consent_Event_Operation.controller';
import { APITOB_Consent_Event_OperationService } from './APITOB_Consent_Event_Operation.service';
import { RedisService } from 'src/redisService';
import { CommonService } from 'src/common.Service';
import { JwtServices } from "src/jwt.services";
import { CodeService } from 'src/codeService';
import { RuleService } from 'src/ruleService';
import { ConfigService } from "@nestjs/config";
import { EnvData } from 'src/envData/envData.service';
import { JwtService } from '@nestjs/jwt';
@Module({
    imports: [],
    controllers: [APITOB_Consent_Event_OperationController],
    providers: [
      APITOB_Consent_Event_OperationService,
      RedisService,      
      JwtServices,
      JwtService,
      CommonService,      
      CodeService,
      RuleService,
      ConfigService,
      EnvData      
    ],
  })
  export class APITOB_Consent_Event_OperationModule  {}