import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpriorityComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('priorityCombo_361d894ef6b542389f52d78990ef65a4_RequestInitiated') 
        async priorityCombo_361d894ef6b542389f52d78990ef65a4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}