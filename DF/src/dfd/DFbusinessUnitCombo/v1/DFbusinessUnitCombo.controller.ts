import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbusinessUnitComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('businessUnitCombo_1c6753133ca647a1bdb14b959b47ee42_RequestInitiated') 
        async businessUnitCombo_1c6753133ca647a1bdb14b959b47ee42_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}