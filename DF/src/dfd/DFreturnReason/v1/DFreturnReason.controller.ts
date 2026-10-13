import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreturnReasonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('returnReason_ea22633cca7d447cbf594e93752e1656_RequestInitiated') 
        async returnReason_ea22633cca7d447cbf594e93752e1656_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}