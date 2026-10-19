import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFkillSwitchCodeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('killSwitchCodeCombo_ac8b8620aaff156853be5541ac14cf26_RequestInitiated') 
        async killSwitchCodeCombo_ac8b8620aaff156853be5541ac14cf26_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}