import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addPerformanceReviewModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewPerformanceReviewv1CT006PFPFDECPHRMaddPerformanceReviewModifyv1_798452814b1e4817a9fe1011935fa986_68cb46b6b2ebfec8569a2c9d87f1b289111_RequestInitiated') 
        async CT006UFUFWECPHRMnewPerformanceReviewv1CT006PFPFDECPHRMaddPerformanceReviewModifyv1_798452814b1e4817a9fe1011935fa986_68cb46b6b2ebfec8569a2c9d87f1b289111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMperformanceReviewDeletev1CT006PFPFDECPHRMaddPerformanceReviewModifyv1_798452814b1e4817a9fe1011935fa986_aadd3270762b72f1e8717da37779b4bd111_RequestInitiated') 
        async CT006UFUFWECPHRMperformanceReviewDeletev1CT006PFPFDECPHRMaddPerformanceReviewModifyv1_798452814b1e4817a9fe1011935fa986_aadd3270762b72f1e8717da37779b4bd111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewModifyv1_1fca7d0fb0c44ea0a80ae29f6db0dd74_d9gb7kp8rws0008cea7g_decisionnode_initiated') 
        async CT006PFPFDECPHRMaddPerformanceReviewModifyv1_1fca7d0fb0c44ea0a80ae29f6db0dd74_d9gb7kp8rws0008cea7g_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewModifyv1_759f978f3d0548bca8489d80a6b1b6da_d9gb7kp8rws0008cea80_Review_Modified') 
        async CT006PFPFDECPHRMaddPerformanceReviewModifyv1_759f978f3d0548bca8489d80a6b1b6da_d9gb7kp8rws0008cea80_Review_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewModifyv1_4675499c71ca43de9c1f2e76e593f44e_d9gb7kp8rws0008cea8g_Review_Deleted') 
        async CT006PFPFDECPHRMaddPerformanceReviewModifyv1_4675499c71ca43de9c1f2e76e593f44e_d9gb7kp8rws0008cea8g_Review_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewModifyv1_64c7f5ea01c141cea2913efd4ea394a0_d9gb7kp8rws0008cea90_get_cycle_id_initiated') 
        async CT006PFPFDECPHRMaddPerformanceReviewModifyv1_64c7f5ea01c141cea2913efd4ea394a0_d9gb7kp8rws0008cea90_get_cycle_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceReviewModifyv1_23f340a4a3f945b6a62a49774b35bb57_d9gb7kp8rws0008cea9g_patch_hrm_performance_reviews_initiated') 
        async CT006PFPFDECPHRMaddPerformanceReviewModifyv1_23f340a4a3f945b6a62a49774b35bb57_d9gb7kp8rws0008cea9g_patch_hrm_performance_reviews_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}