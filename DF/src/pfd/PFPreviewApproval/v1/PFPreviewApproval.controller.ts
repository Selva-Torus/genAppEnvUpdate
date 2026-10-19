import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPreviewApprovalController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddReviewScreenv1CT003PFPFDTAGTAGreviewApprovalv1_37c5d7749396eeea5e05cf6010a604d1_3ee6fdd78d4fa65707941dba36e6dec4111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddReviewScreenv1CT003PFPFDTAGTAGreviewApprovalv1_37c5d7749396eeea5e05cf6010a604d1_3ee6fdd78d4fa65707941dba36e6dec4111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGaddReviewScreenv1CT003PFPFDTAGTAGreviewApprovalv1_37c5d7749396eeea5e05cf6010a604d1_0e8da9c062d19d2557e2e492a7f37dc6111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddReviewScreenv1CT003PFPFDTAGTAGreviewApprovalv1_37c5d7749396eeea5e05cf6010a604d1_0e8da9c062d19d2557e2e492a7f37dc6111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGreviewApprovalv1_0f80e46d8008f1a850a0acea3638f367_db4exv7rvk90008602yg_apinode_initiated') 
        async CT003PFPFDTAGTAGreviewApprovalv1_0f80e46d8008f1a850a0acea3638f367_db4exv7rvk90008602yg_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGreviewApprovalv1_00f1c0518e2142378f66bac9ba2a71f9_db90htzrvk9000866q2g_End_initiated') 
        async CT003PFPFDTAGTAGreviewApprovalv1_00f1c0518e2142378f66bac9ba2a71f9_db90htzrvk9000866q2g_End_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}