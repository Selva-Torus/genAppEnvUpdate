import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyPolicyRuleController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddPolicyRulev1CT003PFPFDTAGTAGmodifyPolicyRulev1_8adeaddb5dcbc4bb04fc0abd7064bb68_66c095f6db78cfb8012c41f75848ac76111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddPolicyRulev1CT003PFPFDTAGTAGmodifyPolicyRulev1_8adeaddb5dcbc4bb04fc0abd7064bb68_66c095f6db78cfb8012c41f75848ac76111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeletePolicyRulev1CT003PFPFDTAGTAGmodifyPolicyRulev1_8adeaddb5dcbc4bb04fc0abd7064bb68_38f30e570e5c4702aaeb8c0c2306aa11111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeletePolicyRulev1CT003PFPFDTAGTAGmodifyPolicyRulev1_8adeaddb5dcbc4bb04fc0abd7064bb68_38f30e570e5c4702aaeb8c0c2306aa11111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyPolicyRulev1_86adaa5367701f1b11f9116978c4f7f4_dbpb1anzkwr0008ybpeg_dec_update_or_delete_initiated') 
        async CT003PFPFDTAGTAGmodifyPolicyRulev1_86adaa5367701f1b11f9116978c4f7f4_dbpb1anzkwr0008ybpeg_dec_update_or_delete_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyPolicyRulev1_cc1e911185583709fa7c1eda804e5695_dbpb1anzkwr0008ybpf0_Policy_Deleted') 
        async CT003PFPFDTAGTAGmodifyPolicyRulev1_cc1e911185583709fa7c1eda804e5695_dbpb1anzkwr0008ybpf0_Policy_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyPolicyRulev1_9b19b9b43dbeca093049585bf26a2aa5_dbpb1anzkwr0008ybpfg_Policy_Modified') 
        async CT003PFPFDTAGTAGmodifyPolicyRulev1_9b19b9b43dbeca093049585bf26a2aa5_dbpb1anzkwr0008ybpfg_Policy_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}