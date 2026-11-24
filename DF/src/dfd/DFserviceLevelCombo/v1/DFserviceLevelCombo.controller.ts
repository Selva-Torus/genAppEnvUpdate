import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFserviceLevelComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('serviceLevelCombo_73ce83ccbb8345dbbfa098ab81ebcf77_RequestInitiated') 
        async serviceLevelCombo_73ce83ccbb8345dbbfa098ab81ebcf77_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}