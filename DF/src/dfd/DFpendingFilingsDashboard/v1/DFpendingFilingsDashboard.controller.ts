import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpendingFilingsDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('pendingFilingsDashboard_8b0289dbf9266995803c648cb5e1bb85_RequestInitiated') 
        async pendingFilingsDashboard_8b0289dbf9266995803c648cb5e1bb85_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('pendingFilingsDashboard_959ca53e2d07473a4303071fbd6a8201_RequestInitiated') 
        async pendingFilingsDashboard_959ca53e2d07473a4303071fbd6a8201_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}