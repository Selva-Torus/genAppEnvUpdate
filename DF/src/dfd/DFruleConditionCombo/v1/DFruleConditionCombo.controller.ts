import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFruleConditionComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('ruleConditionCombo_52162b0f0d574010b05086a9663188a4_RequestInitiated') 
        async ruleConditionCombo_52162b0f0d574010b05086a9663188a4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}