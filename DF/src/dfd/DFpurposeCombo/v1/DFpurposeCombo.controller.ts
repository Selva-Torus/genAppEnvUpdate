import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpurposeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('purposeCombo_5471d624e4554623ae570b210c03118e_RequestInitiated') 
        async purposeCombo_5471d624e4554623ae570b210c03118e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}