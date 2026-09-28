import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpiechartDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('piechartDashboard_04d2191e5edf5566d4c6d9a277325cbb_RequestInitiated') 
        async piechartDashboard_04d2191e5edf5566d4c6d9a277325cbb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}