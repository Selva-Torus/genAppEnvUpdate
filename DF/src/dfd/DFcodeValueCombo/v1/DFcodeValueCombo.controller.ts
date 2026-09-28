import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcodeValueComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('codeValueCombo_233bd314301449bbbe282c3c78d8b3fe_RequestInitiated') 
        async codeValueCombo_233bd314301449bbbe282c3c78d8b3fe_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}