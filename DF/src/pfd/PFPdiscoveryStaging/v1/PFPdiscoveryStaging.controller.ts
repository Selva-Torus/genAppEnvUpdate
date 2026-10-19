import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdiscoveryStagingController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdiscoveryQueuev1CT003PFPFDTAGTAGdiscoveryStagingv1_31508741cfa246eab223f3a2f747c3b1_3b7ee6a7a2c0441593508ae0278fd7d5111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdiscoveryQueuev1CT003PFPFDTAGTAGdiscoveryStagingv1_31508741cfa246eab223f3a2f747c3b1_3b7ee6a7a2c0441593508ae0278fd7d5111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_0a8c8ed35193453899874ea06fd6ddbe_db4wtwkrvk9000860ewg_dbnode_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_0a8c8ed35193453899874ea06fd6ddbe_db4wtwkrvk9000860ewg_dbnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_a2a216cd34a74d538b0d453e1b07f931_db3jpzbrvk900085wt20_AWSBedrockAgentCore') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_a2a216cd34a74d538b0d453e1b07f931_db3jpzbrvk900085wt20_AWSBedrockAgentCore(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_cf646b5d21404377acb049f6ab060599_db4wtwkrvk9000860exg_ASSUREBedrockAgentCore') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_cf646b5d21404377acb049f6ab060599_db4wtwkrvk9000860exg_ASSUREBedrockAgentCore(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_3a1f24194681478cb2b0adb50632505d_db3jpzbrvk900085wt2g_ai_asset_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_3a1f24194681478cb2b0adb50632505d_db3jpzbrvk900085wt2g_ai_asset_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_adff91783efd4e50b2c1309a5b40eecb_db4wtwkrvk9000860eyg_assure_asset_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_adff91783efd4e50b2c1309a5b40eecb_db4wtwkrvk9000860eyg_assure_asset_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_24895cbd0bc84f6dbf90ef9ce650ebf1_db3jpzbrvk900085wt30_ai_asset_model_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_24895cbd0bc84f6dbf90ef9ce650ebf1_db3jpzbrvk900085wt30_ai_asset_model_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_fe43026f09ea4eadb8da7435532dc316_db4wtwkrvk9000860ezg_assure_ai_asset_model_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_fe43026f09ea4eadb8da7435532dc316_db4wtwkrvk9000860ezg_assure_ai_asset_model_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_b31a64ad69464262a8aa98b0b855243b_db3jpzbrvk900085wt3g_ai_asset_version_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_b31a64ad69464262a8aa98b0b855243b_db3jpzbrvk900085wt3g_ai_asset_version_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_73eb1f2a853847f09eb1f816fd636cd6_db4wtwkrvk9000860f0g_assure_ai_asset_version_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_73eb1f2a853847f09eb1f816fd636cd6_db4wtwkrvk9000860f0g_assure_ai_asset_version_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_70c85f49677f49b293917ea2f115ed09_db86spyrvk9000864yrg_ai_asset_version_completed') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_70c85f49677f49b293917ea2f115ed09_db86spyrvk9000864yrg_ai_asset_version_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_370d6a7bfa8c41fd89fa2bdc4e9e759b_db4wtwkrvk9000860f1g_assure_update_discovery_staging_initiated') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_370d6a7bfa8c41fd89fa2bdc4e9e759b_db4wtwkrvk9000860f1g_assure_update_discovery_staging_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryStagingv1_3b72cee5828a4beb9e46d43f568cc515_db3k7b5rvk900085x6r0_ai_asset_added') 
        async CT003PFPFDTAGTAGdiscoveryStagingv1_3b72cee5828a4beb9e46d43f568cc515_db3k7b5rvk900085x6r0_ai_asset_added(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}