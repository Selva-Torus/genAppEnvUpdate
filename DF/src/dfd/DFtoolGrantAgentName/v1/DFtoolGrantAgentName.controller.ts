import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtoolGrantAgentNameController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('toolGrantAgentName_401a69ea7e56e90dc8fa7834e050bd67_RequestInitiated') 
        async toolGrantAgentName_401a69ea7e56e90dc8fa7834e050bd67_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}