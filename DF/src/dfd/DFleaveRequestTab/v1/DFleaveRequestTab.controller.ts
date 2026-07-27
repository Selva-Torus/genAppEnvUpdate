import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleaveRequestTabController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leaveRequestTab_7d6e05277d7f4dd6a74a26dee1893f8c_RequestInitiated') 
        async leaveRequestTab_7d6e05277d7f4dd6a74a26dee1893f8c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('leaveRequestTab_ab5f8235aecd446e98e2f183b8a9c21b_RequestInitiated') 
        async leaveRequestTab_ab5f8235aecd446e98e2f183b8a9c21b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}