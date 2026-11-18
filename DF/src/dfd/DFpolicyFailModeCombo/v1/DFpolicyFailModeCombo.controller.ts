import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpolicyFailModeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('policyFailModeCombo_e3946bbeef24f6aaacfeebf6f5373bf7_RequestInitiated') 
        async policyFailModeCombo_e3946bbeef24f6aaacfeebf6f5373bf7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}