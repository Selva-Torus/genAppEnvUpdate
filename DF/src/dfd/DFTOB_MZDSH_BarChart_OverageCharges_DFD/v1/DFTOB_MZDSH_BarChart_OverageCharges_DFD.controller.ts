import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_MZDSH_BarChart_OverageCharges_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_MZDSH_BarChart_OverageCharges_DFD_ef5a0e6dd4044a0f8c427641ed157521_RequestInitiated') 
        async TOB_MZDSH_BarChart_OverageCharges_DFD_ef5a0e6dd4044a0f8c427641ed157521_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_MZDSH_BarChart_OverageCharges_DFD_643c07be1f9b4fdba51787b2ad0eed03_MongoDBRequestInitiated') 
        async TOB_MZDSH_BarChart_OverageCharges_DFD_643c07be1f9b4fdba51787b2ad0eed03_MongoDBRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}