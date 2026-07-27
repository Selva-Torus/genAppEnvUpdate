
import { Module } from "@nestjs/common";
import { addEmployeeModifyController } from "./addEmployeeModify.controller";
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
    controllers: [addEmployeeModifyController],
    providers: [RedisService,CommonService,RuleService,CodeService,JwtService,ConfigService, LockService,EnvData,],
})




export class addEmployeeModifyModule {}
