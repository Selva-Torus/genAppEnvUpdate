import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchannelChartDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('channelChartDashboard_0de07f85d9a444c5a3caae508fb938ae_RequestInitiated') 
        async channelChartDashboard_0de07f85d9a444c5a3caae508fb938ae_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}