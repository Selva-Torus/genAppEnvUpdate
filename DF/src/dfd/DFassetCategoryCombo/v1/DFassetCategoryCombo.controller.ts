import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetCategoryComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetCategoryCombo_6c621eee55d74b90b98208d7cbbc07c8_RequestInitiated') 
        async assetCategoryCombo_6c621eee55d74b90b98208d7cbbc07c8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}