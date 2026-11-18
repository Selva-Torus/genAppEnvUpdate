import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrevocationReceiptListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('revocationReceiptList_8e85e4bd430a190f223b74f279ada22a_RequestInitiated') 
        async revocationReceiptList_8e85e4bd430a190f223b74f279ada22a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}