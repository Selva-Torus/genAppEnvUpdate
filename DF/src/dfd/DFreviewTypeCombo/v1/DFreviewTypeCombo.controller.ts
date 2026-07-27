import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreviewTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('reviewTypeCombo_30e1d36c6ae3ef8ac1b99bb26130586c_RequestInitiated') 
        async reviewTypeCombo_30e1d36c6ae3ef8ac1b99bb26130586c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}