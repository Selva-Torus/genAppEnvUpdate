import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbarChartDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('barChartDashboard_4794517974c555ff01fd885dbcc768e2_RequestInitiated') 
        async barChartDashboard_4794517974c555ff01fd885dbcc768e2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}