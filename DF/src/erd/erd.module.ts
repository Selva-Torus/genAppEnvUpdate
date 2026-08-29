import { HttpStatus, Module } from '@nestjs/common';
import { claimsModule } from './claims/claims.module';   
import { claims_detailModule } from './claims_detail/claims_detail.module';   
import { codedescriptionModule } from './codedescription/codedescription.module';   
import { usersModule } from './users/users.module';   
import { employee_detailsModule } from './employee_details/employee_details.module';   
import { employee_expense_claimsModule } from './employee_expense_claims/employee_expense_claims.module';   
import { communicationModule } from './communication/communication.module';   
import { combo_tableModule } from './combo_table/combo_table.module';   
import { test_erdModule } from './test_erd/test_erd.module';   
import { dynamic_tableModule } from './dynamic_table/dynamic_table.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [claimsModule,claims_detailModule,codedescriptionModule,usersModule,employee_detailsModule,employee_expense_claimsModule,communicationModule,combo_tableModule,test_erdModule,dynamic_tableModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
