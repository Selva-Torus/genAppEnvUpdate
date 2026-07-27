import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcurrencyComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('currencyCombo_ef410871b38b4e64bf1952a7ea0a33c5_RequestInitiated') 
        async currencyCombo_ef410871b38b4e64bf1952a7ea0a33c5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}