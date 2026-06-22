import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdepreciationMethodComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('depreciationMethodCombo_c28269c146a2451ba349ab57f1f049ed_RequestInitiated') 
        async depreciationMethodCombo_c28269c146a2451ba349ab57f1f049ed_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}