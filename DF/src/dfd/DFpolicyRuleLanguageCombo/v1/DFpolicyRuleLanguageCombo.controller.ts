import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpolicyRuleLanguageComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('policyRuleLanguageCombo_6079bda050a492b31ebfdf3494891932_RequestInitiated') 
        async policyRuleLanguageCombo_6079bda050a492b31ebfdf3494891932_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}