import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFamrQueueDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('amrQueueDashboard_fdba99471cba487896ccb46ad8344f80_RequestInitiated') 
        async amrQueueDashboard_fdba99471cba487896ccb46ad8344f80_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('amrQueueDashboard_1639d2c2900c41c7a9c9c3a882cf0bac_RequestInitiated') 
        async amrQueueDashboard_1639d2c2900c41c7a9c9c3a882cf0bac_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}