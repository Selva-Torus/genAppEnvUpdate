import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchannelDashboard_dashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('channelDashboard_dashboard_68b4ab7958c64cb7a4e3b1dd377aa699_RequestInitiated') 
        async channelDashboard_dashboard_68b4ab7958c64cb7a4e3b1dd377aa699_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}