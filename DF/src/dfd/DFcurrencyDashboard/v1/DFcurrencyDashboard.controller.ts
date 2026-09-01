import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcurrencyDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('currencyDashboard_9a6c85167b644487b248d20c81c5fbb4_RequestInitiated') 
        async currencyDashboard_9a6c85167b644487b248d20c81c5fbb4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}