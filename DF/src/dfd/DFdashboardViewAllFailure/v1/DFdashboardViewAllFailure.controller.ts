import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdashboardViewAllFailureController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('dashboardViewAllFailure_51766d5b97f0f43b9c5f689235ec37f6_RequestInitiated') 
        async dashboardViewAllFailure_51766d5b97f0f43b9c5f689235ec37f6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}