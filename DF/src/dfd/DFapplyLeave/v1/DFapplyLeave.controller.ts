import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFapplyLeaveController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('applyLeave_16b62cef1e2346aca295955bf7f79ebc_RequestInitiated') 
        async applyLeave_16b62cef1e2346aca295955bf7f79ebc_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('applyLeave_39645aa0f2064fb48ea2e65e5e5e702a_RequestInitiated') 
        async applyLeave_39645aa0f2064fb48ea2e65e5e5e702a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}