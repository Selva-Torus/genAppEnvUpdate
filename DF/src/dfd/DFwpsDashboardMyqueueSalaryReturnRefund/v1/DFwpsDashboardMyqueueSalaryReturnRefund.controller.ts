import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardMyqueueSalaryReturnRefundController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardMyqueueSalaryReturnRefund_e76b78f6bf6a44a3898fa8b106b97182_RequestInitiated') 
        async wpsDashboardMyqueueSalaryReturnRefund_e76b78f6bf6a44a3898fa8b106b97182_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}