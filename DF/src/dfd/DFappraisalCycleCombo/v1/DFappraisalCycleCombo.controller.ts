import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFappraisalCycleComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('appraisalCycleCombo_713970e2ca144b748caf12aa4c57149f_RequestInitiated') 
        async appraisalCycleCombo_713970e2ca144b748caf12aa4c57149f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}