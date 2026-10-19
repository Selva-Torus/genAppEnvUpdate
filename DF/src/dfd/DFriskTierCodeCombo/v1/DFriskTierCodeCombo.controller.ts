import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFriskTierCodeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('riskTierCodeCombo_c8a8bb91f4faa92815f7a3eac49e3be1_RequestInitiated') 
        async riskTierCodeCombo_c8a8bb91f4faa92815f7a3eac49e3be1_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}