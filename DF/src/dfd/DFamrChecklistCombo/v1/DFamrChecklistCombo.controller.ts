import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFamrChecklistComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('amrChecklistCombo_c6e52b37857940fd83c7dff3b2cfff76_RequestInitiated') 
        async amrChecklistCombo_c6e52b37857940fd83c7dff3b2cfff76_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}