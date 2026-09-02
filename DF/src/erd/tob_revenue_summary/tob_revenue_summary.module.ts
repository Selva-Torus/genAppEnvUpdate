import { Module } from "@nestjs/common";
import { tob_revenue_summaryController } from "./tob_revenue_summary.controller";
import { tob_revenue_summaryService } from "./tob_revenue_summary.service";
import { JwtModule } from "@nestjs/jwt";
import { RedisService } from "src/redisService";
import { JwtServices } from "src/jwt.services";
import { CommonService } from "src/common.Service";
import { PrismaService } from "../prisma.service";
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
     controllers: [tob_revenue_summaryController],
     providers: [tob_revenue_summaryService, PrismaService,JwtServices,RedisService,CommonService,RuleService,CodeService,ConfigService,EnvData,UfService,OptimisticLockService]
})
export class tob_revenue_summaryModule{}

