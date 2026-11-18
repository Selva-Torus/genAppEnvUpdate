import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddKillSwitchActionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddKillSwitchActionv1CT003PFPFDTAGTAGaddKillSwitchActionv1_d8af584cb7a92a324cd55192f2e86e56_fc4001a1cffac3a538994a911b7ba06f111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddKillSwitchActionv1CT003PFPFDTAGTAGaddKillSwitchActionv1_d8af584cb7a92a324cd55192f2e86e56_fc4001a1cffac3a538994a911b7ba06f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddKillSwitchActionv1_5de13b1f21b040ef41e77b92ce80fe12_dbxg3y7ybrm0008gevn0_get_identity_ref_id_initiated') 
        async CT003PFPFDTAGTAGaddKillSwitchActionv1_5de13b1f21b040ef41e77b92ce80fe12_dbxg3y7ybrm0008gevn0_get_identity_ref_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddKillSwitchActionv1_dfbd972a0355f1bd96182e76d0a3edb5_dbxg3y7ybrm0008gevng_post_agent_action_initiated') 
        async CT003PFPFDTAGTAGaddKillSwitchActionv1_dfbd972a0355f1bd96182e76d0a3edb5_dbxg3y7ybrm0008gevng_post_agent_action_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}