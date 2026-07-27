import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaddPerformanceCycleModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('addPerformanceCycleModify_fa120eee79ac41509fc2de2bdb096d37_RequestInitiated') 
        async addPerformanceCycleModify_fa120eee79ac41509fc2de2bdb096d37_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('addPerformanceCycleModify_027910746c6343f7b637e85490c0c120_RequestInitiated') 
        async addPerformanceCycleModify_027910746c6343f7b637e85490c0c120_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}