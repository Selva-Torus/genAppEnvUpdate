import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFproductDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('productDashboard_a75dd6386c484bf79d36dab7aa9cf1b6_RequestInitiated') 
        async productDashboard_a75dd6386c484bf79d36dab7aa9cf1b6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}