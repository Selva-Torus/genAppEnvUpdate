import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrejectReasonSimulatorComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('rejectReasonSimulatorCombo_3e8b975a28a5d2112a0097c47cd55714_RequestInitiated') 
        async rejectReasonSimulatorCombo_3e8b975a28a5d2112a0097c47cd55714_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}