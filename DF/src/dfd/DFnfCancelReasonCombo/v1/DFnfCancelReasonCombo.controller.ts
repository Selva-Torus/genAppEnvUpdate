import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfCancelReasonComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfCancelReasonCombo_497ff6c3b7f44d299f27deb5433969b6_RequestInitiated') 
        async nfCancelReasonCombo_497ff6c3b7f44d299f27deb5433969b6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}