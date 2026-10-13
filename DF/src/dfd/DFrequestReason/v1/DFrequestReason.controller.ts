import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrequestReasonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('requestReason_ebba6d459f7e41495ab4b41c0da67361_RequestInitiated') 
        async requestReason_ebba6d459f7e41495ab4b41c0da67361_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}