import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddRiskRuleConditionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddRiskRuleConditionv1CT003PFPFDTAGTAGaddRiskRuleConditionv1_4146bd1823b243d29314e1f217f7cf1c_0c5e0c4116456d4f7d3ebfbeafc86246111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddRiskRuleConditionv1CT003PFPFDTAGTAGaddRiskRuleConditionv1_4146bd1823b243d29314e1f217f7cf1c_0c5e0c4116456d4f7d3ebfbeafc86246111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddRiskRuleConditionv1_cb011612577d4f0fad444a5048006a2e_dax2rt3zkz4g0087aat0_saveCompleted') 
        async CT003PFPFDTAGTAGaddRiskRuleConditionv1_cb011612577d4f0fad444a5048006a2e_dax2rt3zkz4g0087aat0_saveCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}