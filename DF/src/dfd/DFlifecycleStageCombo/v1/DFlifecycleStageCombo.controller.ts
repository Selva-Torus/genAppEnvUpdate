import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFlifecycleStageComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('lifecycleStageCombo_e49aa9886cda47978f243813a24db75a_RequestInitiated') 
        async lifecycleStageCombo_e49aa9886cda47978f243813a24db75a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}