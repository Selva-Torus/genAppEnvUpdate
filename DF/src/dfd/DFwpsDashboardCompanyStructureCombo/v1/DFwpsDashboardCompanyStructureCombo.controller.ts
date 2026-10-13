import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardCompanyStructureComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardCompanyStructureCombo_4b597b01ffee4f3ea40dff800f6a1350_RequestInitiated') 
        async wpsDashboardCompanyStructureCombo_4b597b01ffee4f3ea40dff800f6a1350_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}