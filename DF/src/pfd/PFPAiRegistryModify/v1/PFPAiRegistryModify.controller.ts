import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPAiRegistryModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGregisterAIAssetv1CT003PFPFDTAGTAGAiRegistryModifyv1_56d529d1fe9156ed0b1a685a9b8ac549_683d1de6baf325cc2d7f209d5bbebf0f111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGregisterAIAssetv1CT003PFPFDTAGTAGAiRegistryModifyv1_56d529d1fe9156ed0b1a685a9b8ac549_683d1de6baf325cc2d7f209d5bbebf0f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGAIRegistryDeletev1CT003PFPFDTAGTAGAiRegistryModifyv1_56d529d1fe9156ed0b1a685a9b8ac549_ad60f90b4bd6bc56e84988bfc100f4f4111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGAIRegistryDeletev1CT003PFPFDTAGTAGAiRegistryModifyv1_56d529d1fe9156ed0b1a685a9b8ac549_ad60f90b4bd6bc56e84988bfc100f4f4111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGAiRegistryModifyv1_54639fe21c284c26851786783e6cfba8_datbz2czkz4g008xhs30_humantasknode_completed') 
        async CT003PFPFDTAGTAGAiRegistryModifyv1_54639fe21c284c26851786783e6cfba8_datbz2czkz4g008xhs30_humantasknode_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGAiRegistryModifyv1_9186474a930b4f06b5afb88fc78ac22d_db2cwd9rvk900085r6cg_Asset_Deleted') 
        async CT003PFPFDTAGTAGAiRegistryModifyv1_9186474a930b4f06b5afb88fc78ac22d_db2cwd9rvk900085r6cg_Asset_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGAiRegistryModifyv1_cf71b8c20b975b7003ff831f5c5f6375_db2cwd9rvk900085r6c0_Asset_Modified') 
        async CT003PFPFDTAGTAGAiRegistryModifyv1_cf71b8c20b975b7003ff831f5c5f6375_db2cwd9rvk900085r6c0_Asset_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}