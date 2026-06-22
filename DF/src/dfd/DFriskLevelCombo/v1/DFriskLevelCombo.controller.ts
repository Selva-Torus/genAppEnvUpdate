import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFriskLevelComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('riskLevelCombo_8449662e4fd04bcb80ef70be21bfd74c_RequestInitiated') 
        async riskLevelCombo_8449662e4fd04bcb80ef70be21bfd74c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}