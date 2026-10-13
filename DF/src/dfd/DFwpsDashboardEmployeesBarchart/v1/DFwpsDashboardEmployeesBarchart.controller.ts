import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardEmployeesBarchartController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardEmployeesBarchart_da31fade9ffb445e8b0c80995ac09416_RequestInitiated') 
        async wpsDashboardEmployeesBarchart_da31fade9ffb445e8b0c80995ac09416_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}