import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFmessageTypeSimulatorComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('messageTypeSimulatorCombo_29f055ee8fdabe050baa3792b7d017ea_RequestInitiated') 
        async messageTypeSimulatorCombo_29f055ee8fdabe050baa3792b7d017ea_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}