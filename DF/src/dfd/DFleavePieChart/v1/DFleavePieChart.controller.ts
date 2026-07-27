import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleavePieChartController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leavePieChart_8af81a8c997940c0b6bb6f7407b625e4_RequestInitiated') 
        async leavePieChart_8af81a8c997940c0b6bb6f7407b625e4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}