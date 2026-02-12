
import { Module } from "@nestjs/common";
//import { Process_Fabric_For_ReimfastService } from "./Process_Fabric_For_Reimfast.service";
import { Process_Fabric_For_ReimfastController } from "./Process_Fabric_For_Reimfast.controller";
import { RedisService } from "src/redisService";
import { CommonService } from "src/common.Service";
import { JwtService } from "@nestjs/jwt";
import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { MongoService } from "src/mongoService";
import { ConfigService } from '@nestjs/config';
import { LockService } from "src/lock.service";
import { TeModule } from "src/Torus/v1/te/te.module";

@Module({
    imports: [TeModule],
    controllers: [Process_Fabric_For_ReimfastController],
    providers: [RedisService,CommonService,RuleService,CodeService,JwtService,ConfigService, LockService,MongoService],
})
export class Process_Fabric_For_ReimfastModule {}
