import { HttpStatus, Module } from '@nestjs/common';
import { userModule } from './user/user.module';   
import { comboboxtableModule } from './comboboxtable/comboboxtable.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [userModule,comboboxtableModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
