import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetDisposalController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetDisposal_8724abc175bd4ad1b143952146f9a1ef_RequestInitiated') 
        async assetDisposal_8724abc175bd4ad1b143952146f9a1ef_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assetDisposal_1d36f55182b042ad946873239ea59ff0_RequestInitiated') 
        async assetDisposal_1d36f55182b042ad946873239ea59ff0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}