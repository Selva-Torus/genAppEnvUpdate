import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAIModelController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAIModelsv1CT003PFPFDTAGTAGaddAIModelv1_d329c12bcb0e8f00f00b245fae76dbe2_2944abb4753e7c2cb4225c40196445a1111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAIModelsv1CT003PFPFDTAGTAGaddAIModelv1_d329c12bcb0e8f00f00b245fae76dbe2_2944abb4753e7c2cb4225c40196445a1111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAIModelv1_8ef70eee8620d17d702e7d73ee4d9d11_125b0deba6ea45f4a19bb9471b6a81bb_apinode_initiated') 
        async CT003PFPFDTAGTAGaddAIModelv1_8ef70eee8620d17d702e7d73ee4d9d11_125b0deba6ea45f4a19bb9471b6a81bb_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}