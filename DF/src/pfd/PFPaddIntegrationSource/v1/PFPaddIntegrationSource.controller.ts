import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddIntegrationSourceController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddIntegrationSourcev1CT003PFPFDTAGTAGaddIntegrationSourcev1_199f8a12c9bb4a198a3865f6c1018b54_d7a437bf111a42a49640677b13560722111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddIntegrationSourcev1CT003PFPFDTAGTAGaddIntegrationSourcev1_199f8a12c9bb4a198a3865f6c1018b54_d7a437bf111a42a49640677b13560722111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddIntegrationSourcev1_33fbd2ac922d496ea3ad8d78c12e264f_darhqfdh1bp0008fbcxg_saveCompleted') 
        async CT003PFPFDTAGTAGaddIntegrationSourcev1_33fbd2ac922d496ea3ad8d78c12e264f_darhqfdh1bp0008fbcxg_saveCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddIntegrationSourcev1_9904e1fe47c0437e95c59c46767f2d50_darex85h1bp0008fanjg_Success') 
        async CT003PFPFDTAGTAGaddIntegrationSourcev1_9904e1fe47c0437e95c59c46767f2d50_darex85h1bp0008fanjg_Success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}