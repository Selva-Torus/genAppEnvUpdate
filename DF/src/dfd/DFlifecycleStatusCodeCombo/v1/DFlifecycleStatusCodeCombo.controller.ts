import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFlifecycleStatusCodeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('lifecycleStatusCodeCombo_cf6ea351e11ac6c4b30f36b7c1a18df5_RequestInitiated') 
        async lifecycleStatusCodeCombo_cf6ea351e11ac6c4b30f36b7c1a18df5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}