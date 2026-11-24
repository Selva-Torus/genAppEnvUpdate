import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcategoryPurposeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('categoryPurposeCombo_948eddbac90141e4882c2363fc65955e_RequestInitiated') 
        async categoryPurposeCombo_948eddbac90141e4882c2363fc65955e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}