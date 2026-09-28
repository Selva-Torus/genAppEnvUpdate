import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteIntegraionRunController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteIntegrationRunv1CT003PFPFDTAGTAGdeleteIntegraionRunv1_4b006cbbf8dd414599ddff7b8b17edd0_d2aae24d035e4b1f80dd4e4cc0d80c50111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteIntegrationRunv1CT003PFPFDTAGTAGdeleteIntegraionRunv1_4b006cbbf8dd414599ddff7b8b17edd0_d2aae24d035e4b1f80dd4e4cc0d80c50111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteIntegraionRunv1_38a893d4add447b08f14494deb831918_daswee1zkz4g008xgg5g_deleted') 
        async CT003PFPFDTAGTAGdeleteIntegraionRunv1_38a893d4add447b08f14494deb831918_daswee1zkz4g008xgg5g_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}