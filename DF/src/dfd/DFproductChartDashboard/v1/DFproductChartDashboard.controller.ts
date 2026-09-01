import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFproductChartDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('productChartDashboard_96586de5c9854f02aee370579b276c2a_RequestInitiated') 
        async productChartDashboard_96586de5c9854f02aee370579b276c2a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}