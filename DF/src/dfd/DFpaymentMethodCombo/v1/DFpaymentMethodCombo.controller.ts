import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpaymentMethodComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('paymentMethodCombo_2312914950d247a98754aea7dcef17e7_RequestInitiated') 
        async paymentMethodCombo_2312914950d247a98754aea7dcef17e7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}