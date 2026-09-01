import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFonlineOfflineDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('onlineOfflineDashboard_34bfbe4b92ad486bb3b2fdfa7100b4ae_RequestInitiated') 
        async onlineOfflineDashboard_34bfbe4b92ad486bb3b2fdfa7100b4ae_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}