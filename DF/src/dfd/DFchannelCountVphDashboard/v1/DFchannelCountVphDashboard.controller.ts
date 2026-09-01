import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchannelCountVphDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('channelCountVphDashboard_4694b4cd0ea34d0db77992bbda019635_RequestInitiated') 
        async channelCountVphDashboard_4694b4cd0ea34d0db77992bbda019635_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}