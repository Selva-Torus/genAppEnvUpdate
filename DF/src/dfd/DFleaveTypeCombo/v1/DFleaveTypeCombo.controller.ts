import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleaveTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leaveTypeCombo_28c1a938df8b074ea3b65be1c6d1e311_RequestInitiated') 
        async leaveTypeCombo_28c1a938df8b074ea3b65be1c6d1e311_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}