import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreviewFrequencyComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('reviewFrequencyCombo_346e20f2116fb089dc7175ba70eac42d_RequestInitiated') 
        async reviewFrequencyCombo_346e20f2116fb089dc7175ba70eac42d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}