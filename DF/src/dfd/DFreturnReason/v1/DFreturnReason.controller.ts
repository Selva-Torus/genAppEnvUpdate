import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreturnReasonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('returnReason_e558390fa7ce471f8f979992226ad56a_RequestInitiated') 
        async returnReason_e558390fa7ce471f8f979992226ad56a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}