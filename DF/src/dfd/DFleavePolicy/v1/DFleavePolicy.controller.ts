import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleavePolicyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leavePolicy_61958960d69f90c0c0c0327b996a1683_RequestInitiated') 
        async leavePolicy_61958960d69f90c0c0c0327b996a1683_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('leavePolicy_7b6d067d807fd334d18da6317a203bb1_RequestInitiated') 
        async leavePolicy_7b6d067d807fd334d18da6317a203bb1_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}