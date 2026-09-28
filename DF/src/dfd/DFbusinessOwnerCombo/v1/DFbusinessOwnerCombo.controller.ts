import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbusinessOwnerComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('businessOwnerCombo_c6850586cb8b1e808db0f83801a8cc88_RequestInitiated') 
        async businessOwnerCombo_c6850586cb8b1e808db0f83801a8cc88_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}