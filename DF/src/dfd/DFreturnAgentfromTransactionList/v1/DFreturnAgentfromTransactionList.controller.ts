import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreturnAgentfromTransactionListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('returnAgentfromTransactionList_dce1143f98e9412699f5aa99b155fb59_RequestInitiated') 
        async returnAgentfromTransactionList_dce1143f98e9412699f5aa99b155fb59_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}