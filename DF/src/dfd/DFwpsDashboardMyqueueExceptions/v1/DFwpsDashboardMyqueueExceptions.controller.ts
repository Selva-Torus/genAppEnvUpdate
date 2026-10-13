import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardMyqueueExceptionsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardMyqueueExceptions_cd07dfc616be4458b9a1c147d3a8d15e_RequestInitiated') 
        async wpsDashboardMyqueueExceptions_cd07dfc616be4458b9a1c147d3a8d15e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}