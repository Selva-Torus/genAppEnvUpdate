import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddPolicyRuleController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddPolicyRulev1CT003PFPFDTAGTAGaddPolicyRulev1_90eb425236a578df022ee5aa5b8b3192_dcec0aebdc52af421df6d690c75736ea111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddPolicyRulev1CT003PFPFDTAGTAGaddPolicyRulev1_90eb425236a578df022ee5aa5b8b3192_dcec0aebdc52af421df6d690c75736ea111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddPolicyRulev1_7e78f1f9ead0766111127af261d306ce_dbp5pwvzkwr0008yb5p0_post_agent_action_initiated') 
        async CT003PFPFDTAGTAGaddPolicyRulev1_7e78f1f9ead0766111127af261d306ce_dbp5pwvzkwr0008yb5p0_post_agent_action_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}