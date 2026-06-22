import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcurrencyComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('currencyCombo_5ff38df3529a0c5ff32c3ed13a6ca094_RequestInitiated') 
        async currencyCombo_5ff38df3529a0c5ff32c3ed13a6ca094_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}