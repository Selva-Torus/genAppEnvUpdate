import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFgradeNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('gradeNameCombo_4974ba5348294d47b5c6142fb22ce74a_RequestInitiated') 
        async gradeNameCombo_4974ba5348294d47b5c6142fb22ce74a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}