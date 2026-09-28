import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddIntegrationFieldMapController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddIntegrationFieldMapv1CT003PFPFDTAGTAGaddIntegrationFieldMapv1_f32f5dc365d3b389b37ac1e7707a5d05_36bb3255e8d94153ac9559a2ec810340111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddIntegrationFieldMapv1CT003PFPFDTAGTAGaddIntegrationFieldMapv1_f32f5dc365d3b389b37ac1e7707a5d05_36bb3255e8d94153ac9559a2ec810340111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddIntegrationFieldMapv1_594107706cd2b552d8634a3d62c51687_dav0vsqzkz4g008xm3kg_saveCompleted') 
        async CT003PFPFDTAGTAGaddIntegrationFieldMapv1_594107706cd2b552d8634a3d62c51687_dav0vsqzkz4g008xm3kg_saveCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddIntegrationFieldMapv1_1054cae66931e68fafc6e1cea21cb88c_dav0vsqzkz4g008xm3m0_success') 
        async CT003PFPFDTAGTAGaddIntegrationFieldMapv1_1054cae66931e68fafc6e1cea21cb88c_dav0vsqzkz4g008xm3m0_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}