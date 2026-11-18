import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdefaultEffectComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('defaultEffectCombo_a65867f5c96fed44a717e6a62766e9d8_RequestInitiated') 
        async defaultEffectCombo_a65867f5c96fed44a717e6a62766e9d8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}