import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtransactionCountVphDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('transactionCountVphDashboard_ccfeff99b47a41a1b1fc2a6a55c13247_RequestInitiated') 
        async transactionCountVphDashboard_ccfeff99b47a41a1b1fc2a6a55c13247_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}