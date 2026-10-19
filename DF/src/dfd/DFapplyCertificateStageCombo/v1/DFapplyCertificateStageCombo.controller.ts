import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFapplyCertificateStageComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('applyCertificateStageCombo_fc8778732036233f5db4001f3af00332_RequestInitiated') 
        async applyCertificateStageCombo_fc8778732036233f5db4001f3af00332_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}