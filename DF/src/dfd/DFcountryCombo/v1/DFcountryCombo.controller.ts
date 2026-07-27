import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcountryComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('countryCombo_977fe4003c4a4a2b80d13802f41851f0_RequestInitiated') 
        async countryCombo_977fe4003c4a4a2b80d13802f41851f0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}