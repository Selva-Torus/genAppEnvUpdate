import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyRiskTierAssesmentController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGchangeTierv1CT003PFPFDTAGTAGmodifyRiskTierAssesmentv1_7bc46865eb5e628809a8b32d669e08d5_d5019f738270442aa130d5a237104709111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGchangeTierv1CT003PFPFDTAGTAGmodifyRiskTierAssesmentv1_7bc46865eb5e628809a8b32d669e08d5_d5019f738270442aa130d5a237104709111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyRiskTierAssesmentv1_cb523a9ddd85330254ace34e1a77258c_846cbf3c092a443f8c23e3d2a6973d1b_patch_tier_assesment_initiated') 
        async CT003PFPFDTAGTAGmodifyRiskTierAssesmentv1_cb523a9ddd85330254ace34e1a77258c_846cbf3c092a443f8c23e3d2a6973d1b_patch_tier_assesment_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyRiskTierAssesmentv1_32aedeff8e8a4614a1b8b427f48f0d67_db4cqnyrvk900085zex0_patch_tier_assesment_completed') 
        async CT003PFPFDTAGTAGmodifyRiskTierAssesmentv1_32aedeff8e8a4614a1b8b427f48f0d67_db4cqnyrvk900085zex0_patch_tier_assesment_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}