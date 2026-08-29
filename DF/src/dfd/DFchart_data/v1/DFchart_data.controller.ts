import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchart_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('chart_data_08a60421d86a4eac8c5502edb4d7fc7e_RequestInitiated') 
        async chart_data_08a60421d86a4eac8c5502edb4d7fc7e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('chart_data_a0e99bd52d2548d78dd167e5fee11919_RequestInitiated') 
        async chart_data_a0e99bd52d2548d78dd167e5fee11919_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}