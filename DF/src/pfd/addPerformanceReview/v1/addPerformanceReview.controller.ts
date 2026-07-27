import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addPerformanceReviewController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewPerformanceReviewv1CT006PFPFDECPHRMaddPerformanceReviewv1_6235d6b4e27e33eceb1d1fac6007a2b6_d688887c7b759b7f518a7234f7502eeb111_RequestInitiated') 
        async CT006UFUFWECPHRMnewPerformanceReviewv1CT006PFPFDECPHRMaddPerformanceReviewv1_6235d6b4e27e33eceb1d1fac6007a2b6_d688887c7b759b7f518a7234f7502eeb111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewv1_a62a7028571247a2856ba22b0d46d369_d9gab3w8rws0008ce4rg_get_emp_id_initiated') 
        async CT006PFPFDECPHRMaddPerformanceReviewv1_a62a7028571247a2856ba22b0d46d369_d9gab3w8rws0008ce4rg_get_emp_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewv1_01c49842e47642bf8e9425c2ae3c4acd_d9gab3w8rws0008ce4s0_get_cycle_id_initiated') 
        async CT006PFPFDECPHRMaddPerformanceReviewv1_01c49842e47642bf8e9425c2ae3c4acd_d9gab3w8rws0008ce4s0_get_cycle_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewv1_cac956f82d016d1fb6fd29bdd840c2d3_d9g9txb8rws0008cdyt0_post_review_initiated') 
        async CT006PFPFDECPHRMaddPerformanceReviewv1_cac956f82d016d1fb6fd29bdd840c2d3_d9g9txb8rws0008cdyt0_post_review_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}