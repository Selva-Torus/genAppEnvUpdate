import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardYearComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardYearCombo_3f3a13e5e7af4e779736d1c723c7742d_RequestInitiated') 
        async wpsDashboardYearCombo_3f3a13e5e7af4e779736d1c723c7742d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}