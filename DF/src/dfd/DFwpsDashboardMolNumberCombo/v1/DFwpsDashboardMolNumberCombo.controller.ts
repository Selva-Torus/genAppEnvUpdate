import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardMolNumberComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardMolNumberCombo_1e9b6cf8b5c341f1a25c6cf573a9aab2_RequestInitiated') 
        async wpsDashboardMolNumberCombo_1e9b6cf8b5c341f1a25c6cf573a9aab2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}