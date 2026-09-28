import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyAssetVersionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAssetVersionv1CT003PFPFDTAGTAGmodifyAssetVersionv1_9433cb4ebc0002a50b7d6b8ab182f5d8_0d82e4c09ff34fcea213f06f5ee0d4af111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAssetVersionv1CT003PFPFDTAGTAGmodifyAssetVersionv1_9433cb4ebc0002a50b7d6b8ab182f5d8_0d82e4c09ff34fcea213f06f5ee0d4af111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteAIAssetVersionv1CT003PFPFDTAGTAGmodifyAssetVersionv1_9433cb4ebc0002a50b7d6b8ab182f5d8_c38931644a4d5d462053554bcea82920111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteAIAssetVersionv1CT003PFPFDTAGTAGmodifyAssetVersionv1_9433cb4ebc0002a50b7d6b8ab182f5d8_c38931644a4d5d462053554bcea82920111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAssetVersionv1_4f88c07c10d7c5fa8187c3b695efe890_datcp2rzkz4g008xj8hg_decisionnode_initiated') 
        async CT003PFPFDTAGTAGmodifyAssetVersionv1_4f88c07c10d7c5fa8187c3b695efe890_datcp2rzkz4g008xj8hg_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAssetVersionv1_f00e4bfaa513e628ddfd0afbf8abb28c_datcp2rzkz4g008xj8j0_Action_Request_Modify') 
        async CT003PFPFDTAGTAGmodifyAssetVersionv1_f00e4bfaa513e628ddfd0afbf8abb28c_datcp2rzkz4g008xj8j0_Action_Request_Modify(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAssetVersionv1_a4c2250b836b9f46af3b1ff407708704_datcp2rzkz4g008xj8jg_Action_Request_Delete') 
        async CT003PFPFDTAGTAGmodifyAssetVersionv1_a4c2250b836b9f46af3b1ff407708704_datcp2rzkz4g008xj8jg_Action_Request_Delete(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAssetVersionv1_077c3551d9e819eff5b512a00170ab13_datcp2rzkz4g008xj8k0_patch_ai_agent_by_id_initiated') 
        async CT003PFPFDTAGTAGmodifyAssetVersionv1_077c3551d9e819eff5b512a00170ab13_datcp2rzkz4g008xj8k0_patch_ai_agent_by_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}