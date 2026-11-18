import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIAgentControlController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIAgentControl_55c9bc7ee5cc75490c68e68509d205b6_RequestInitiated') 
        async AIAgentControl_55c9bc7ee5cc75490c68e68509d205b6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('AIAgentControl_bf86732b75cee6055ed5446113c4cc7d_RequestInitiated') 
        async AIAgentControl_bf86732b75cee6055ed5446113c4cc7d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}