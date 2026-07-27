import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpolicyNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('policyNameCombo_1f95e859953b464f8ecfcf03560f2605_RequestInitiated') 
        async policyNameCombo_1f95e859953b464f8ecfcf03560f2605_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}