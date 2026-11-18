import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFkillSwitchContainStatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('killSwitchContainStatusCombo_c854be0aa6cd8792f2b6252e3579db41_RequestInitiated') 
        async killSwitchContainStatusCombo_c854be0aa6cd8792f2b6252e3579db41_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}