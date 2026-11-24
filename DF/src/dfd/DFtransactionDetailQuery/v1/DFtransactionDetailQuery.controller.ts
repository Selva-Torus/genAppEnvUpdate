import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtransactionDetailQueryController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('transactionDetailQuery_cdd1acacd5db4448a3cae5881ab0c117_RequestInitiated') 
        async transactionDetailQuery_cdd1acacd5db4448a3cae5881ab0c117_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}