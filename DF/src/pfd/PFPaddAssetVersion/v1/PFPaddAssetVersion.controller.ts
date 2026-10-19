import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAssetVersionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAssetVersionv1CT003PFPFDTAGTAGaddAssetVersionv1_b9a1bdc474cc2a043055b9afd7e29974_e474feda69c50bfcc39fc82918a95953111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAssetVersionv1CT003PFPFDTAGTAGaddAssetVersionv1_b9a1bdc474cc2a043055b9afd7e29974_e474feda69c50bfcc39fc82918a95953111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAssetVersionv1_93f23dd654c58a08dcedb177056ac2ac_datchv7zkz4g008xj430_dbnode_initiated') 
        async CT003PFPFDTAGTAGaddAssetVersionv1_93f23dd654c58a08dcedb177056ac2ac_datchv7zkz4g008xj430_dbnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAssetVersionv1_0721bdd7b9add91301941aeda324e14a_datchv7zkz4g008xj43g_post_ai_asset_version_initiated') 
        async CT003PFPFDTAGTAGaddAssetVersionv1_0721bdd7b9add91301941aeda324e14a_datchv7zkz4g008xj43g_post_ai_asset_version_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}