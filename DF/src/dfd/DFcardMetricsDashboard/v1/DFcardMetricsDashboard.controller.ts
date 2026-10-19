import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcardMetricsDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('cardMetricsDashboard_9db0de38f29f12319f3050d1077510d4_RequestInitiated') 
        async cardMetricsDashboard_9db0de38f29f12319f3050d1077510d4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}