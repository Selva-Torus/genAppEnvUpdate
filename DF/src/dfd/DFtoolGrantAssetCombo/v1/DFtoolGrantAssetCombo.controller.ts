import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtoolGrantAssetComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('toolGrantAssetCombo_bc6c45b79bc543e08a9fe2a1dbffc812_RequestInitiated') 
        async toolGrantAssetCombo_bc6c45b79bc543e08a9fe2a1dbffc812_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}