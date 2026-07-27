import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFhrmDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('hrmDashboard_acc464ae6e954839a32e54542e5d814b_RequestInitiated') 
        async hrmDashboard_acc464ae6e954839a32e54542e5d814b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('hrmDashboard_62739d1fbea344c49f2c6f70da576797_RequestInitiated') 
        async hrmDashboard_62739d1fbea344c49f2c6f70da576797_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}