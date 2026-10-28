import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchart_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('chart_data_0c2a7fdacd684f35acf6b877480caca7_RequestInitiated') 
        async chart_data_0c2a7fdacd684f35acf6b877480caca7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('chart_data_34cd0bfd86c3401e8168d41b846847c9_RequestInitiated') 
        async chart_data_34cd0bfd86c3401e8168d41b846847c9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}