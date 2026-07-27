import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleaveReasonCategoryComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leaveReasonCategoryCombo_dd99cb8b01ea24594e40ed84f5dba8e8_RequestInitiated') 
        async leaveReasonCategoryCombo_dd99cb8b01ea24594e40ed84f5dba8e8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}