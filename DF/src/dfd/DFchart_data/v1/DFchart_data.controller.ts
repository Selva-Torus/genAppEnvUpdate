import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchart_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('chart_data_c57ce8ffa3f04a2fb9cbe13bd7391845_DBRequestInitiated') 
        async chart_data_c57ce8ffa3f04a2fb9cbe13bd7391845_DBRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('chart_data_34cd0bfd86c3401e8168d41b846847c9_DBRequestCompleted') 
        async chart_data_34cd0bfd86c3401e8168d41b846847c9_DBRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}