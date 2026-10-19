import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFlistallShowStagesController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('listallShowStages_02bc55aa51f4e8f88c7a8e90609af157_RequestInitiated') 
        async listallShowStages_02bc55aa51f4e8f88c7a8e90609af157_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}