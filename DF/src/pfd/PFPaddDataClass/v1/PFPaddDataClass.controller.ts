import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddDataClassController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGAIDataClassv1CT003PFPFDTAGTAGaddDataClassv1_155eada99341fb12ef497bbff7cdc9c5_180c3b36a6132c355e3a13a4bbfd6946111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGAIDataClassv1CT003PFPFDTAGTAGaddDataClassv1_155eada99341fb12ef497bbff7cdc9c5_180c3b36a6132c355e3a13a4bbfd6946111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddDataClassv1_01789f356328025424f155691fb42bef_1d0704d2fc074de8a960a14bcc3a461d_humantasknode_completed') 
        async CT003PFPFDTAGTAGaddDataClassv1_01789f356328025424f155691fb42bef_1d0704d2fc074de8a960a14bcc3a461d_humantasknode_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}