import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFperformanceCycleController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('performanceCycle_97f7a38ae517e45ebf0ac99b917be68d_RequestInitiated') 
        async performanceCycle_97f7a38ae517e45ebf0ac99b917be68d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('performanceCycle_71a31e785ee9740d72f4062144061875_RequestInitiated') 
        async performanceCycle_71a31e785ee9740d72f4062144061875_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}