import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyRiskRuleController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddRiskRulev1CT003PFPFDTAGTAGmodifyRiskRulev1_f47059e7268522bd04b7e8065e8e0ccb_9c43dd746ec54c69adc90c141c664f3f111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddRiskRulev1CT003PFPFDTAGTAGmodifyRiskRulev1_f47059e7268522bd04b7e8065e8e0ccb_9c43dd746ec54c69adc90c141c664f3f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteRiskRulev1CT003PFPFDTAGTAGmodifyRiskRulev1_f47059e7268522bd04b7e8065e8e0ccb_c3d5cdc1424055516c6a579cf642baeb111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteRiskRulev1CT003PFPFDTAGTAGmodifyRiskRulev1_f47059e7268522bd04b7e8065e8e0ccb_c3d5cdc1424055516c6a579cf642baeb111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyRiskRulev1_23622019c7579fdda6c5ea39b7cecd26_dax2tskzkz4g0087ae5g_decisionnode_initiated') 
        async CT003PFPFDTAGTAGmodifyRiskRulev1_23622019c7579fdda6c5ea39b7cecd26_dax2tskzkz4g0087ae5g_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyRiskRulev1_8d63b8170c5a7b6b7797ea08b1f540c7_dax2tskzkz4g0087ae60_Action_Request_Delete') 
        async CT003PFPFDTAGTAGmodifyRiskRulev1_8d63b8170c5a7b6b7797ea08b1f540c7_dax2tskzkz4g0087ae60_Action_Request_Delete(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyRiskRulev1_f462f43922249229e6ec9ea41b322a52_dax2tskzkz4g0087ae6g_Action_Request_Modify') 
        async CT003PFPFDTAGTAGmodifyRiskRulev1_f462f43922249229e6ec9ea41b322a52_dax2tskzkz4g0087ae6g_Action_Request_Modify(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}