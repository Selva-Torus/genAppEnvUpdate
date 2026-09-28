import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdiscoveryQueueCardsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('discoveryQueueCards_21e13c294c5c48b581c20cbdb9fb2c30_RequestInitiated') 
        async discoveryQueueCards_21e13c294c5c48b581c20cbdb9fb2c30_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}