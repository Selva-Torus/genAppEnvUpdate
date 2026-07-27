import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaccrualFrequencyComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('accrualFrequencyCombo_9405489d3ae3112858ebc572825ec776_RequestInitiated') 
        async accrualFrequencyCombo_9405489d3ae3112858ebc572825ec776_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}