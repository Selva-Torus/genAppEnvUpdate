import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpriorityComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('priorityCombo_4567f6cae9141b83022bfa6cebac05b8_RequestInitiated') 
        async priorityCombo_4567f6cae9141b83022bfa6cebac05b8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}