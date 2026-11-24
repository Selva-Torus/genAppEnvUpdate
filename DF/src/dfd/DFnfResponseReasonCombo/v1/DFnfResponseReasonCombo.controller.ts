import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfResponseReasonComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfResponseReasonCombo_9b585928d16741e79d451bcb1ad9e8a2_RequestInitiated') 
        async nfResponseReasonCombo_9b585928d16741e79d451bcb1ad9e8a2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}