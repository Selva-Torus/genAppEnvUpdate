import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsNackFailureTransactionList_postingExceptionViewTransactionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsNackFailureTransactionList_postingExceptionViewTransaction_869fd4b725a14340a8b8c9276a003632_RequestInitiated') 
        async wpsNackFailureTransactionList_postingExceptionViewTransaction_869fd4b725a14340a8b8c9276a003632_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}