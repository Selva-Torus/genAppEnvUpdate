import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardSalaryProcessBarchartController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardSalaryProcessBarchart_5b53ce088cd3435d9180d261ff8a882b_RequestInitiated') 
        async wpsDashboardSalaryProcessBarchart_5b53ce088cd3435d9180d261ff8a882b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}