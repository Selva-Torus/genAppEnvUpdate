import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleaveManageDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leaveManageDocTable_d374c56e50cccd04389e9f3f640996f2_RequestInitiated') 
        async leaveManageDocTable_d374c56e50cccd04389e9f3f640996f2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}