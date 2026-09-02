import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFMongo_LineChart_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('Mongo_LineChart_DFD_89ec3157a1de402389b7a77bfb962b55_APIRequestInitiated') 
        async Mongo_LineChart_DFD_89ec3157a1de402389b7a77bfb962b55_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('Mongo_LineChart_DFD_c8e555856ba643f2bcea780f240af994_APIRequestCompleted') 
        async Mongo_LineChart_DFD_c8e555856ba643f2bcea780f240af994_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}