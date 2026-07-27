import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class accessRequestModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaccessRequestDeletev1CT006PFPFDECPHRMaccessRequestModifyv1_692772276da8b7836b2a0223d5be8e75_ec9ceef203f4b248afb418a42223840c111_RequestInitiated') 
        async CT006UFUFWECPHRMaccessRequestDeletev1CT006PFPFDECPHRMaccessRequestModifyv1_692772276da8b7836b2a0223d5be8e75_ec9ceef203f4b248afb418a42223840c111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMnewAccessRequestv1CT006PFPFDECPHRMaccessRequestModifyv1_692772276da8b7836b2a0223d5be8e75_2ce27ad9183b4b758513703ab4ad86f7111_RequestInitiated') 
        async CT006UFUFWECPHRMnewAccessRequestv1CT006PFPFDECPHRMaccessRequestModifyv1_692772276da8b7836b2a0223d5be8e75_2ce27ad9183b4b758513703ab4ad86f7111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaccessRequestModifyv1_e9cbaf59de83b5e9e78254a9f0831fb3_4f259f26e12447729ff2870a88b906b4_RequestCompleted') 
        async CT006PFPFDECPHRMaccessRequestModifyv1_e9cbaf59de83b5e9e78254a9f0831fb3_4f259f26e12447729ff2870a88b906b4_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaccessRequestModifyv1_4a50c33e2856342f1a28ae8e6dd1a543_3ca615556b76452db0340f1ec4c1814e_Access_Request_Modified') 
        async CT006PFPFDECPHRMaccessRequestModifyv1_4a50c33e2856342f1a28ae8e6dd1a543_3ca615556b76452db0340f1ec4c1814e_Access_Request_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaccessRequestModifyv1_a3bcf245b0e1cdf5a0f78a0254d8bcd9_fbc4f36237c74ffcad4f8367c2805d6b_Access_Request_Deleted') 
        async CT006PFPFDECPHRMaccessRequestModifyv1_a3bcf245b0e1cdf5a0f78a0254d8bcd9_fbc4f36237c74ffcad4f8367c2805d6b_Access_Request_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}