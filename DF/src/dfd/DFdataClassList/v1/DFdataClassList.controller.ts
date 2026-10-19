import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdataClassListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('dataClassList_4adec06b10f624e4e38d3995582c2f66_RequestInitiated') 
        async dataClassList_4adec06b10f624e4e38d3995582c2f66_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('dataClassList_18b59646ec700208545dcc05b1141e83_RequestInitiated') 
        async dataClassList_18b59646ec700208545dcc05b1141e83_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}