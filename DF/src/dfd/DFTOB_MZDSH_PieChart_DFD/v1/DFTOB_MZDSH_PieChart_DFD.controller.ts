import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_MZDSH_PieChart_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_MZDSH_PieChart_DFD_a4328eb3c8ff46d4aae87b02f7715c35_MongoDBInitiated') 
        async TOB_MZDSH_PieChart_DFD_a4328eb3c8ff46d4aae87b02f7715c35_MongoDBInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_MZDSH_PieChart_DFD_c33068835c0d4af7904c7b28fa315c44_MongoDBInitiatedSucess') 
        async TOB_MZDSH_PieChart_DFD_c33068835c0d4af7904c7b28fa315c44_MongoDBInitiatedSucess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}