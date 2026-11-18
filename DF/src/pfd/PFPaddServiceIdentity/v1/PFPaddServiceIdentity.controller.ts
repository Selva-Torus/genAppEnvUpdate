import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddServiceIdentityController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddServiceIdentityv1CT003PFPFDTAGTAGaddServiceIdentityv1_55e5b7ba07a186e9cffaf2d8179a85f4_52717e99ba6eec9c4c6ed0a033ac97f8111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddServiceIdentityv1CT003PFPFDTAGTAGaddServiceIdentityv1_55e5b7ba07a186e9cffaf2d8179a85f4_52717e99ba6eec9c4c6ed0a033ac97f8111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddServiceIdentityv1_e9269b52502203f7b5af60270f3e1a4e_dbsb06rg5z8g008c6xqg_get_asset_id_initiated') 
        async CT003PFPFDTAGTAGaddServiceIdentityv1_e9269b52502203f7b5af60270f3e1a4e_dbsb06rg5z8g008c6xqg_get_asset_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddServiceIdentityv1_a5fc9c94e2944870ba3ffff62c081eb6_dbpvcehg5z8g008c6mb0_get_credentails_ref_id_initiated') 
        async CT003PFPFDTAGTAGaddServiceIdentityv1_a5fc9c94e2944870ba3ffff62c081eb6_dbpvcehg5z8g008c6mb0_get_credentails_ref_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddServiceIdentityv1_a72044a0c9fd3eff999964fa27d9aa79_dbsb06rg5z8g008c6xrg_post_agent_action_initiated') 
        async CT003PFPFDTAGTAGaddServiceIdentityv1_a72044a0c9fd3eff999964fa27d9aa79_dbsb06rg5z8g008c6xrg_post_agent_action_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}