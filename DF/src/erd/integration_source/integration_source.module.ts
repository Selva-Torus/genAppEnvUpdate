import { Module } from "@nestjs/common";
import { integration_sourceController } from "./integration_source.controller";
import { integration_sourceService } from "./integration_source.service";
import { JwtModule } from "@nestjs/jwt";
import { RedisService } from "src/redisService";
import { JwtServices } from "src/jwt.services";
import { CommonService } from "src/common.Service";
import { PrismaService } from "../prisma.service";
import { CdcPrismaService } from "../cdc_prisma.service";     
import { AbilityModule } from "../ability/ability.module";
import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { ConfigService } from "@nestjs/config";
import { UfService } from "src/Torus/v1/uf/uf.service";
import { EnvData } from "src/envData/envData.service";
import { OptimisticLockService } from "src/optimistic-lock.service";

@Module({
     imports: [AbilityModule,JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        })],
     controllers: [integration_sourceController],
     providers: [integration_sourceService, PrismaService,CdcPrismaService,JwtServices,RedisService,CommonService,RuleService,CodeService,ConfigService,EnvData,UfService,OptimisticLockService]
})
export class integration_sourceModule{}

