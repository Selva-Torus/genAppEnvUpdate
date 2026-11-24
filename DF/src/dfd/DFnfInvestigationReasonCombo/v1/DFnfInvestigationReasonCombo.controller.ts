import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfInvestigationReasonComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfInvestigationReasonCombo_6df588621edb4452bb8b9f64a7a684f1_RequestInitiated') 
        async nfInvestigationReasonCombo_6df588621edb4452bb8b9f64a7a684f1_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}