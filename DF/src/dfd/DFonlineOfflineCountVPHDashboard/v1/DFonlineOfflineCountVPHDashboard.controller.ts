import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFonlineOfflineCountVPHDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('onlineOfflineCountVPHDashboard_99520ab4b2f84f5f9e5c57b59acb8bab_RequestInitiated') 
        async onlineOfflineCountVPHDashboard_99520ab4b2f84f5f9e5c57b59acb8bab_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}