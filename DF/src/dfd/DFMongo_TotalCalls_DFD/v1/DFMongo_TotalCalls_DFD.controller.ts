import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFMongo_TotalCalls_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('Mongo_TotalCalls_DFD_9d8e3276724947c2912f87ea49574067_APIRequestInitiated') 
        async Mongo_TotalCalls_DFD_9d8e3276724947c2912f87ea49574067_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('Mongo_TotalCalls_DFD_7e3119b818b94f71afe230d3f9048e82_APIRequestCompleted') 
        async Mongo_TotalCalls_DFD_7e3119b818b94f71afe230d3f9048e82_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}