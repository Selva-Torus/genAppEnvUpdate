
import { Module } from "@nestjs/common";

import { DFTOB_Consent_Request_CA_DFDController } from "./DFTOB_Consent_Request_CA_DFD.controller";
import { RedisService } from "src/redisService";
import { CommonService } from "src/common.Service";
import { JwtService } from "@nestjs/jwt";
import { JwtServices } from "src/jwt.services";
import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { ConfigService } from "@nestjs/config";
import { LockService } from "src/lock.service";
import { TeModule } from "src/Torus/v1/te/te.module";
import { EnvData } from 'src/envData/envData.service';


@Module({
    imports: [TeModule],
    controllers: [DFTOB_Consent_Request_CA_DFDController],
    providers: [RedisService,CommonService,RuleService,CodeService,JwtService,JwtServices,ConfigService, LockService,EnvData,],
})



export class DFTOB_Consent_Request_CA_DFDModule {}
