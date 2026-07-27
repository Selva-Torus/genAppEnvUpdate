import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFriskLevelComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('riskLevelCombo_7001cd63301033bac25d88929c849622_RequestInitiated') 
        async riskLevelCombo_7001cd63301033bac25d88929c849622_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}