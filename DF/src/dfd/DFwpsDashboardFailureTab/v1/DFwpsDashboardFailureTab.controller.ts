import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardFailureTabController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardFailureTab_19374ab3a1194db2b8dc8098753d5d65_RequestInitiated') 
        async wpsDashboardFailureTab_19374ab3a1194db2b8dc8098753d5d65_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}