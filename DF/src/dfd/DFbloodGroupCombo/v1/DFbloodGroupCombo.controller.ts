import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbloodGroupComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('bloodGroupCombo_e608fe57fde94ceb868e412c8f22a58f_RequestInitiated') 
        async bloodGroupCombo_e608fe57fde94ceb868e412c8f22a58f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}