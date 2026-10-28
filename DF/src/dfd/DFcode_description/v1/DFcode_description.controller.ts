import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcode_descriptionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('code_description_77f0aa053109458d869a8c1a71054f71_RequestInitiated') 
        async code_description_77f0aa053109458d869a8c1a71054f71_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('code_description_c00274196bd4445f93b744c5a189d292_RequestInitiated') 
        async code_description_c00274196bd4445f93b744c5a189d292_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}