
import { Module } from "@nestjs/common";
import { accessReqDocumentController } from "./accessReqDocument.controller";
import { RedisService } from "src/redisService";
import { CommonService } from "src/common.Service";
import { JwtService } from "@nestjs/jwt";
import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { ConfigService } from '@nestjs/config';
import { LockService } from "src/lock.service";
import { TeModule } from "src/Torus/v1/te/te.module";
import { EnvData } from 'src/envData/envData.service';


@Module({
    imports: [TeModule],
    controllers: [accessReqDocumentController],
    providers: [RedisService,CommonService,RuleService,CodeService,JwtService,ConfigService, LockService,EnvData,],
})




export class accessReqDocumentModule {}
