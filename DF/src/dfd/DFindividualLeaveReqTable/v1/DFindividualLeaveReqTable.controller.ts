import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFindividualLeaveReqTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('individualLeaveReqTable_bd71f8a8d2724b508b8358d73ceae0e7_RequestInitiated') 
        async individualLeaveReqTable_bd71f8a8d2724b508b8358d73ceae0e7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}