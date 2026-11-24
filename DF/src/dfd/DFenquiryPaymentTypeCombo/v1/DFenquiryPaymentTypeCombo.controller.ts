import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFenquiryPaymentTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('enquiryPaymentTypeCombo_8708d48ddd324d68975017596fddf5a8_RequestInitiated') 
        async enquiryPaymentTypeCombo_8708d48ddd324d68975017596fddf5a8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}