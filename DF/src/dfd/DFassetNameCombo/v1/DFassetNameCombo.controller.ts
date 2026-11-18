import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetNameCombo_d082e0ba76bdf1bb9aee13a3ad04fbd7_RequestInitiated') 
        async assetNameCombo_d082e0ba76bdf1bb9aee13a3ad04fbd7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}