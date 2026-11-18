import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIAgentActionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIAgentAction_43a8a1640a5b9a87b609aa2db1906abc_RequestInitiated') 
        async AIAgentAction_43a8a1640a5b9a87b609aa2db1906abc_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}