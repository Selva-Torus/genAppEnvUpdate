import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_MZDSH_TotalCards_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_MZDSH_TotalCards_DFD_93304470375749ecb3444ca6e684f464_MongoDBInitiated') 
        async TOB_MZDSH_TotalCards_DFD_93304470375749ecb3444ca6e684f464_MongoDBInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_MZDSH_TotalCards_DFD_7b458fc880f34f15be76e388e4c67f86_MongoDBInitiatedCompleted') 
        async TOB_MZDSH_TotalCards_DFD_7b458fc880f34f15be76e388e4c67f86_MongoDBInitiatedCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}