import { HttpStatus, Module } from '@nestjs/common';
import { comboboxtableModule } from './comboboxtable/comboboxtable.module';   
import { userModule } from './user/user.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [comboboxtableModule,userModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
