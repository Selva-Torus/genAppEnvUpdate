import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAiRegistryController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGregisterAIAssetv1CT003PFPFDTAGTAGaddAiRegistryv1_ec8cf528fd59bdd67d0d2c2b20415d51_0a98412c68a9cbed30658a0c6c68acc0111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGregisterAIAssetv1CT003PFPFDTAGTAGaddAiRegistryv1_ec8cf528fd59bdd67d0d2c2b20415d51_0a98412c68a9cbed30658a0c6c68acc0111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAiRegistryv1_2d3eb84af1e505f612ee5ef766448883_c9bf9c96dc034ff7bc9c809260a6db29_apinode_initiated') 
        async CT003PFPFDTAGTAGaddAiRegistryv1_2d3eb84af1e505f612ee5ef766448883_c9bf9c96dc034ff7bc9c809260a6db29_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}