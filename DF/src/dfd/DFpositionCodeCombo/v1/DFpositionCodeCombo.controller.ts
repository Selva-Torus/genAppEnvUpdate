import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpositionCodeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('positionCodeCombo_1ca5ef4530874cc9b30d31485bd6f558_RequestInitiated') 
        async positionCodeCombo_1ca5ef4530874cc9b30d31485bd6f558_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}