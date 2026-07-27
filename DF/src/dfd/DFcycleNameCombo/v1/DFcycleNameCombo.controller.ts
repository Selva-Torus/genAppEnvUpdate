import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcycleNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('cycleNameCombo_8aa9e0e2215340fbad26899e6c658d1e_RequestInitiated') 
        async cycleNameCombo_8aa9e0e2215340fbad26899e6c658d1e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}