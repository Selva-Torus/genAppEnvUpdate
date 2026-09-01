import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFprocessCategoryDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('processCategoryDashboard_773cb1062f31439fa31e681e14687b4a_RequestInitiated') 
        async processCategoryDashboard_773cb1062f31439fa31e681e14687b4a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}