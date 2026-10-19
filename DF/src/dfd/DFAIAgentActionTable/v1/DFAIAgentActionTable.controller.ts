import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIAgentActionTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIAgentActionTable_2879beaced104ad28174e51fb8d2af6f_RequestInitiated') 
        async AIAgentActionTable_2879beaced104ad28174e51fb8d2af6f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}