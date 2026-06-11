import { Module } from "@nestjs/common";
import { wps_mohre_salary_dtlController } from "./wps_mohre_salary_dtl.controller";
import { wps_mohre_salary_dtlService } from "./wps_mohre_salary_dtl.service";
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

@Module({
     imports: [AbilityModule,JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        })],
     controllers: [wps_mohre_salary_dtlController],
     providers: [wps_mohre_salary_dtlService, PrismaService,JwtServices,RedisService,CommonService,RuleService,CodeService,ConfigService,EnvData,UfService]
})
export class wps_mohre_salary_dtlModule{}

