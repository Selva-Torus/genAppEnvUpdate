import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFuseCaseComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('useCaseCombo_74968890560142479ad85dbd4fe8b21d_RequestInitiated') 
        async useCaseCombo_74968890560142479ad85dbd4fe8b21d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}