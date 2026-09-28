import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFriskRuleConditionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('riskRuleCondition_ab93b9befd5240cea159abdad34810fb_RequestInitiated') 
        async riskRuleCondition_ab93b9befd5240cea159abdad34810fb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('riskRuleCondition_78909510abe34a378fca6af87dd37c96_RequestInitiated') 
        async riskRuleCondition_78909510abe34a378fca6af87dd37c96_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}