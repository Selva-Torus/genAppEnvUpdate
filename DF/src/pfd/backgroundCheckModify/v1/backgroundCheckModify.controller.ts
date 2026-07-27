import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class backgroundCheckModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewBackgroundCheckv1CT006PFPFDECPHRMbackgroundCheckModifyv1_74d30fe50786f9dc4fe97834004d1097_0e7c93cb34fc3529b98b1ec21be4d9e0111_RequestInitaition') 
        async CT006UFUFWECPHRMnewBackgroundCheckv1CT006PFPFDECPHRMbackgroundCheckModifyv1_74d30fe50786f9dc4fe97834004d1097_0e7c93cb34fc3529b98b1ec21be4d9e0111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMbackgroundCheckDeletev1CT006PFPFDECPHRMbackgroundCheckModifyv1_74d30fe50786f9dc4fe97834004d1097_17e5a95d1855b75521b6609bb691be68111_RequestInitiated') 
        async CT006UFUFWECPHRMbackgroundCheckDeletev1CT006PFPFDECPHRMbackgroundCheckModifyv1_74d30fe50786f9dc4fe97834004d1097_17e5a95d1855b75521b6609bb691be68111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMbackgroundCheckModifyv1_6c036448324525e5ad2bc0ea0c9e0fc6_d9h114m8rws0008ckgp0_RequestCompleted') 
        async CT006PFPFDECPHRMbackgroundCheckModifyv1_6c036448324525e5ad2bc0ea0c9e0fc6_d9h114m8rws0008ckgp0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMbackgroundCheckModifyv1_da0d5207cd7395bacbca5bab6b092496_d9h114m8rws0008ckgpg_check_Modified') 
        async CT006PFPFDECPHRMbackgroundCheckModifyv1_da0d5207cd7395bacbca5bab6b092496_d9h114m8rws0008ckgpg_check_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMbackgroundCheckModifyv1_3f40cfd63a99568ff6e1cc1d8eb4ed76_d9h114m8rws0008ckgq0_check_Deleted') 
        async CT006PFPFDECPHRMbackgroundCheckModifyv1_3f40cfd63a99568ff6e1cc1d8eb4ed76_d9h114m8rws0008ckgq0_check_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}