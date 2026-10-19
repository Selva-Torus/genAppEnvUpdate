import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyAgentActionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAgentActionsv1CT003PFPFDTAGTAGmodifyAgentActionv1_a737762ab64c39eec1136b8ce7cd88d9_4b4d6f3ee935d298271d479bc6936754111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAgentActionsv1CT003PFPFDTAGTAGmodifyAgentActionv1_a737762ab64c39eec1136b8ce7cd88d9_4b4d6f3ee935d298271d479bc6936754111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteAIAgentActionv1CT003PFPFDTAGTAGmodifyAgentActionv1_a737762ab64c39eec1136b8ce7cd88d9_f0170ebbcb711d4d70712ad7fd887d21111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteAIAgentActionv1CT003PFPFDTAGTAGmodifyAgentActionv1_a737762ab64c39eec1136b8ce7cd88d9_f0170ebbcb711d4d70712ad7fd887d21111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAgentActionv1_e4c837aa311c42c3aee2cb00378d6675_daspsexzkz4g008xf8h0_decisionnode_initiated') 
        async CT003PFPFDTAGTAGmodifyAgentActionv1_e4c837aa311c42c3aee2cb00378d6675_daspsexzkz4g008xf8h0_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAgentActionv1_b649d74d7023f46613bd34046dd4f370_dasprpazkz4g008xf8bg_Action_Request_Modify') 
        async CT003PFPFDTAGTAGmodifyAgentActionv1_b649d74d7023f46613bd34046dd4f370_dasprpazkz4g008xf8bg_Action_Request_Modify(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAgentActionv1_92d18852ac79457aadb83e9c0c7c754f_dasptmazkz4g008xf8z0_Action_Request_Delete') 
        async CT003PFPFDTAGTAGmodifyAgentActionv1_92d18852ac79457aadb83e9c0c7c754f_dasptmazkz4g008xf8z0_Action_Request_Delete(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAgentActionv1_1aa740f2bca31382665c0f530f364cb4_dasprpazkz4g008xf8c0_apinode_initiated_success') 
        async CT003PFPFDTAGTAGmodifyAgentActionv1_1aa740f2bca31382665c0f530f364cb4_dasprpazkz4g008xf8c0_apinode_initiated_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}