import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfTransactionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfTransaction_b17c3283176b4f9eb5105f6f3c0f5169_RequestInitiated') 
        async nfTransaction_b17c3283176b4f9eb5105f6f3c0f5169_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}