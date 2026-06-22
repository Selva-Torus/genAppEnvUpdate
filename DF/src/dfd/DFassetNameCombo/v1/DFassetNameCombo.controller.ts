import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetNameCombo_8e1c67e3e3ba4966b4dae3be0492d2b3_RequestInitiated') 
        async assetNameCombo_8e1c67e3e3ba4966b4dae3be0492d2b3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}