import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcode_descriptionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('code_description_7ca4925ff51a496e8afd091bde9f92b4_APIRequestInitiated') 
        async code_description_7ca4925ff51a496e8afd091bde9f92b4_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('code_description_c00274196bd4445f93b744c5a189d292_APIRequestCompleted') 
        async code_description_c00274196bd4445f93b744c5a189d292_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}