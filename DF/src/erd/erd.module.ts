import { HttpStatus, Module } from '@nestjs/common';
import { claimsModule } from './claims/claims.module';   
import { claims_detailModule } from './claims_detail/claims_detail.module';   
import { codedescriptionModule } from './codedescription/codedescription.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [claimsModule,claims_detailModule,codedescriptionModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
