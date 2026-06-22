import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFparentCategoryComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('parentCategoryCombo_2224389632454647a4fddd72ec107111_RequestInitiated') 
        async parentCategoryCombo_2224389632454647a4fddd72ec107111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}