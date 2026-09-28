import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteRiskRuleConditionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteRiskRuleConditionv1CT003PFPFDTAGTAGdeleteRiskRuleConditionv1_8d5320bde3a5222f8004aa5b3887088b_2c6ad320a7507ade6e3ed860214fd2d0111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteRiskRuleConditionv1CT003PFPFDTAGTAGdeleteRiskRuleConditionv1_8d5320bde3a5222f8004aa5b3887088b_2c6ad320a7507ade6e3ed860214fd2d0111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteRiskRuleConditionv1_e5f28913fcb87f43368aa3daf898dc68_dax328szkz4g0087amt0_deletedCompleted') 
        async CT003PFPFDTAGTAGdeleteRiskRuleConditionv1_e5f28913fcb87f43368aa3daf898dc68_dax328szkz4g0087amt0_deletedCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}