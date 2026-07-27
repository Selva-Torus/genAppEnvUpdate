import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleavePolicyDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leavePolicyDocTable_7053930842d1d614bed7f081e22c407d_RequestInitiated') 
        async leavePolicyDocTable_7053930842d1d614bed7f081e22c407d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}