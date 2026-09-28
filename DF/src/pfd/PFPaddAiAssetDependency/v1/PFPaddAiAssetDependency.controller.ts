import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAiAssetDependencyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAiAssetDependencyv1CT003PFPFDTAGTAGaddAiAssetDependencyv1_268d562c2058fb06549e18328d7ad68b_aeda4ab2bb04f8678d41c832eb974cb7111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAiAssetDependencyv1CT003PFPFDTAGTAGaddAiAssetDependencyv1_268d562c2058fb06549e18328d7ad68b_aeda4ab2bb04f8678d41c832eb974cb7111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAiAssetDependencyv1_af4cf36b6203d1cc6a29387127804781_datk1jpzkz4g008xk7y0_get_ai_asset_id_initiated') 
        async CT003PFPFDTAGTAGaddAiAssetDependencyv1_af4cf36b6203d1cc6a29387127804781_datk1jpzkz4g008xk7y0_get_ai_asset_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAiAssetDependencyv1_9ca1c76d98468395937c61157b0753a0_datk1jpzkz4g008xk7yg_post_ai_asset_version_initiated') 
        async CT003PFPFDTAGTAGaddAiAssetDependencyv1_9ca1c76d98468395937c61157b0753a0_datk1jpzkz4g008xk7yg_post_ai_asset_version_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}