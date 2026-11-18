import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPriskRuleEvaluationController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGassetListv1CT003PFPFDTAGTAGriskRuleEvaluationv1_fc126c106cf41572973bbb1a2ec7cc2b_cbd9a0173fb0487d98fb153ab0d04417111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGassetListv1CT003PFPFDTAGTAGriskRuleEvaluationv1_fc126c106cf41572973bbb1a2ec7cc2b_cbd9a0173fb0487d98fb153ab0d04417111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGriskRuleEvaluationv1_c3bcb14eb68c496d913970690663452c_db6znxqrvk9000863420_function_node_initiated') 
        async CT003PFPFDTAGTAGriskRuleEvaluationv1_c3bcb14eb68c496d913970690663452c_db6znxqrvk9000863420_function_node_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGriskRuleEvaluationv1_968e31a2be53944221cceb2a6e496140_d456a74869a7417b81a5927ae8f91217_post_asset_tier_assessment_initiated') 
        async CT003PFPFDTAGTAGriskRuleEvaluationv1_968e31a2be53944221cceb2a6e496140_d456a74869a7417b81a5927ae8f91217_post_asset_tier_assessment_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}