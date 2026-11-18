import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIChangeHistoryTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIChangeHistoryTable_89e987bee0ba412fb1f2ceb077212f79_RequestInitiated') 
        async AIChangeHistoryTable_89e987bee0ba412fb1f2ceb077212f79_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}