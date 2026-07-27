import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrequestTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('requestTypeCombo_023322f7660349d387157bf78d279487_RequestInitiated') 
        async requestTypeCombo_023322f7660349d387157bf78d279487_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}