import { HttpStatus, Module } from '@nestjs/common';
import { hrm_employeesModule } from './hrm_employees/hrm_employees.module';   
import { hrm_job_positionsModule } from './hrm_job_positions/hrm_job_positions.module';   
import { hrm_job_gradesModule } from './hrm_job_grades/hrm_job_grades.module';   
import { hrm_leave_policiesModule } from './hrm_leave_policies/hrm_leave_policies.module';   
import { hrm_leave_requestsModule } from './hrm_leave_requests/hrm_leave_requests.module';   
import { hrm_performance_cyclesModule } from './hrm_performance_cycles/hrm_performance_cycles.module';   
import { hrm_performance_reviewsModule } from './hrm_performance_reviews/hrm_performance_reviews.module';   
import { hrm_separation_checklistsModule } from './hrm_separation_checklists/hrm_separation_checklists.module';   
import { hrm_employee_access_requestsModule } from './hrm_employee_access_requests/hrm_employee_access_requests.module';   
import { hrm_employee_background_checksModule } from './hrm_employee_background_checks/hrm_employee_background_checks.module';   
import { hrm_employee_ndaModule } from './hrm_employee_nda/hrm_employee_nda.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [hrm_employeesModule,hrm_job_positionsModule,hrm_job_gradesModule,hrm_leave_policiesModule,hrm_leave_requestsModule,hrm_performance_cyclesModule,hrm_performance_reviewsModule,hrm_separation_checklistsModule,hrm_employee_access_requestsModule,hrm_employee_background_checksModule,hrm_employee_ndaModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
