import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_MZDSH_PricingTierTable_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_MZDSH_PricingTierTable_DFD_66ae2d480d5446cb9057299d30e4ad00_MongoDBRequestInitiated') 
        async TOB_MZDSH_PricingTierTable_DFD_66ae2d480d5446cb9057299d30e4ad00_MongoDBRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_MZDSH_PricingTierTable_DFD_2c54385293604fa2ac825e7c0c94b88f_MongoDBRequestSucess') 
        async TOB_MZDSH_PricingTierTable_DFD_2c54385293604fa2ac825e7c0c94b88f_MongoDBRequestSucess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}