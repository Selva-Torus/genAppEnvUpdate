import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpolicyRuleListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('policyRuleList_546af1e29289915dbc170d67aae88cc3_RequestInitiated') 
        async policyRuleList_546af1e29289915dbc170d67aae88cc3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}