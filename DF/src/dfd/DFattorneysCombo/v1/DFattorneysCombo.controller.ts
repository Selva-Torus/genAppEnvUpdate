import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFattorneysComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('attorneysCombo_76043290ccdaf6326cee61531633d10c_RequestInitiated') 
        async attorneysCombo_76043290ccdaf6326cee61531633d10c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}