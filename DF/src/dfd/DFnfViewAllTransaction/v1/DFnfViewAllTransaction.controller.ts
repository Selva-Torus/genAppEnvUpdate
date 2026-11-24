import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfViewAllTransactionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfViewAllTransaction_d4bb33784a53454faa4a0fb510dfd772_RequestInitiated') 
        async nfViewAllTransaction_d4bb33784a53454faa4a0fb510dfd772_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}