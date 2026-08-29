
import { Module } from "@nestjs/common";
import { Request_form_default_eventController } from "./Request_form_default_event.controller";
import { RedisService } from "src/redisService";
import { CommonService } from "src/common.Service";
import { JwtService } from "@nestjs/jwt";
import { JwtServices } from "src/jwt.services";
import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { ConfigService } from '@nestjs/config';
import { LockService } from "src/lock.service";
import { TeModule } from "src/Torus/v1/te/te.module";
import { EnvData } from 'src/envData/envData.service';


@Module({
    imports: [TeModule],
    controllers: [Request_form_default_eventController],
    providers: [RedisService,CommonService,RuleService,CodeService,JwtService,JwtServices,ConfigService, LockService,EnvData,],
})




export class Request_form_default_eventModule {}
