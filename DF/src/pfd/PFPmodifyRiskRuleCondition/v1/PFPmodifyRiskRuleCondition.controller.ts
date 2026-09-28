import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyRiskRuleConditionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddRiskRuleConditionv1CT003PFPFDTAGTAGmodifyRiskRuleConditionv1_d9c722cd7b314b539fbd66d164f7dac2_a7a59bda7cc8d2e83e911afaeaa0e469111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddRiskRuleConditionv1CT003PFPFDTAGTAGmodifyRiskRuleConditionv1_d9c722cd7b314b539fbd66d164f7dac2_a7a59bda7cc8d2e83e911afaeaa0e469111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyRiskRuleConditionv1_7257dfbe34604159b094cfd5bd58dec6_dax306rzkz4g0087ajz0_updateCompleted') 
        async CT003PFPFDTAGTAGmodifyRiskRuleConditionv1_7257dfbe34604159b094cfd5bd58dec6_dax306rzkz4g0087ajz0_updateCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}