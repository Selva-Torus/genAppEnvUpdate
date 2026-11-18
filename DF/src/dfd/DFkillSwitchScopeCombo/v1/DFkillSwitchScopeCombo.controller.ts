import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFkillSwitchScopeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('killSwitchScopeCombo_2b97ab29c6e933cdab0054445172e388_RequestInitiated') 
        async killSwitchScopeCombo_2b97ab29c6e933cdab0054445172e388_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}