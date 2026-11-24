import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFinitiationInstructionPriorityComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('initiationInstructionPriorityCombo_c71401e0b7f4454f9652cdd26170b3e4_RequestInitiated') 
        async initiationInstructionPriorityCombo_c71401e0b7f4454f9652cdd26170b3e4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}