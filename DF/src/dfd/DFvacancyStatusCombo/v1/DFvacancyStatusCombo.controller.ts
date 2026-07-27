import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFvacancyStatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('vacancyStatusCombo_7f7ebbfa7c5b4170bb6e1d7b1a73da77_RequestInitiated') 
        async vacancyStatusCombo_7f7ebbfa7c5b4170bb6e1d7b1a73da77_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}