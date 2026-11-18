import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFkillSwitchTriggerTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('killSwitchTriggerTypeCombo_cf5e33f6e71da060e5e169c3cdb3a7e0_RequestInitiated') 
        async killSwitchTriggerTypeCombo_cf5e33f6e71da060e5e169c3cdb3a7e0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}