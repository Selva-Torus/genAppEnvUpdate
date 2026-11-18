import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdiscoveryQueueController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('discoveryQueue_4c25ed5308dd4534b6b3e23cda07c19c_RequestInitiated') 
        async discoveryQueue_4c25ed5308dd4534b6b3e23cda07c19c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}