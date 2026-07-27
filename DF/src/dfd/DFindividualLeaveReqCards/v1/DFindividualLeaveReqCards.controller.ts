import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFindividualLeaveReqCardsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('individualLeaveReqCards_c3aab98cbe4d4dbdaa0b57c7fdbfd36e_RequestInitiated') 
        async individualLeaveReqCards_c3aab98cbe4d4dbdaa0b57c7fdbfd36e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}