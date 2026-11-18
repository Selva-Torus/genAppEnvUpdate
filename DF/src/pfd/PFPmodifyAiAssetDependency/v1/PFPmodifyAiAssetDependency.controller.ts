import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyAiAssetDependencyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAiAssetDependencyv1CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_4a8982b09165b3b5f7819839f14b9606_5ec636ec03a24cd74e7a81253cb5d7fd111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAiAssetDependencyv1CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_4a8982b09165b3b5f7819839f14b9606_5ec636ec03a24cd74e7a81253cb5d7fd111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteAiAssetDependencyv1CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_4a8982b09165b3b5f7819839f14b9606_a8cef6b8b5fe93c573fbbb7fb0548b24111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteAiAssetDependencyv1CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_4a8982b09165b3b5f7819839f14b9606_a8cef6b8b5fe93c573fbbb7fb0548b24111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_99b6c33c483d63be826ca60bd29222d1_datk3jyzkz4g008xk9zg_decisionnode_initiated') 
        async CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_99b6c33c483d63be826ca60bd29222d1_datk3jyzkz4g008xk9zg_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_c59a20d11324ef7ac9b10eb45bd99784_datk3jyzkz4g008xka00_Action_Request_Modify') 
        async CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_c59a20d11324ef7ac9b10eb45bd99784_datk3jyzkz4g008xka00_Action_Request_Modify(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_7900fb07ba12b4cd4a45e31085aa8788_datk3jyzkz4g008xka0g_Action_Request_Delete') 
        async CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_7900fb07ba12b4cd4a45e31085aa8788_datk3jyzkz4g008xka0g_Action_Request_Delete(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_3fc615ecb2c7d802b015a4d478780325_datk3jyzkz4g008xka10_patch_ai_agent_by_id_initiated') 
        async CT003PFPFDTAGTAGmodifyAiAssetDependencyv1_3fc615ecb2c7d802b015a4d478780325_datk3jyzkz4g008xka10_patch_ai_agent_by_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}