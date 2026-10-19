import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdashboardTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('dashboardTable_9a2d2c1a6d854a6582bfecc315b31631_RequestInitiated') 
        async dashboardTable_9a2d2c1a6d854a6582bfecc315b31631_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}