import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyAssessmentTypeApprovalController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGviewRuleEvaluationv1CT003PFPFDTAGTAGmodifyAssessmentTypeApprovalv1_9aaedc92bb8f888c603d21eeba2c707e_886bd02c89d8462c804b744c65f70ab7111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGviewRuleEvaluationv1CT003PFPFDTAGTAGmodifyAssessmentTypeApprovalv1_9aaedc92bb8f888c603d21eeba2c707e_886bd02c89d8462c804b744c65f70ab7111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAssessmentTypeApprovalv1_d0be8150e4da3a5823687972a2e7201e_607553bc48864cb5ae966fe6de1e7a80_patch_tier_assesment_initiated') 
        async CT003PFPFDTAGTAGmodifyAssessmentTypeApprovalv1_d0be8150e4da3a5823687972a2e7201e_607553bc48864cb5ae966fe6de1e7a80_patch_tier_assesment_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAssessmentTypeApprovalv1_37a2bc05146a44dcef8229a8675dc4cb_f2c1d277a5c34cc8bd6ddf3adf0bca1d_assessment_completed') 
        async CT003PFPFDTAGTAGmodifyAssessmentTypeApprovalv1_37a2bc05146a44dcef8229a8675dc4cb_f2c1d277a5c34cc8bd6ddf3adf0bca1d_assessment_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}