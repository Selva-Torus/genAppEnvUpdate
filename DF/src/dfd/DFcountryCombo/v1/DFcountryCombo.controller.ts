import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcountryComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('countryCombo_c8572e44ae5f4a61bd9b332863dcb821_RequestInitiated') 
        async countryCombo_c8572e44ae5f4a61bd9b332863dcb821_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}