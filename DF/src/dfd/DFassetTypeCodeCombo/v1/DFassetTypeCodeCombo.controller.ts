import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetTypeCodeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetTypeCodeCombo_2dff6eb75966712574f2a1b28cc1b887_RequestInitiated') 
        async assetTypeCodeCombo_2dff6eb75966712574f2a1b28cc1b887_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}