import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addCaseApprovalController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWLAPLAPAMRCaseApprovalv1CT006PFPFDLAPLAPaddCaseApprovalv1_b305ab48e9ac4689b5e0947685352aba_a381acb207c24d618bcee925293916fa111_humantasknode_initiated') 
        async CT006UFUFWLAPLAPAMRCaseApprovalv1CT006PFPFDLAPLAPaddCaseApprovalv1_b305ab48e9ac4689b5e0947685352aba_a381acb207c24d618bcee925293916fa111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWLAPLAPAMRCaseApprovalv1CT006PFPFDLAPLAPaddCaseApprovalv1_b305ab48e9ac4689b5e0947685352aba_fe510eb7cdb4407c98ca3c9e6cb27005111_humantasknode_initiated') 
        async CT006UFUFWLAPLAPAMRCaseApprovalv1CT006PFPFDLAPLAPaddCaseApprovalv1_b305ab48e9ac4689b5e0947685352aba_fe510eb7cdb4407c98ca3c9e6cb27005111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseApprovalv1_f48dc101c7e44aacb3ee7c4cceaaba29_d9wx8vva71y0008dq76g_decisionnode_initiated') 
        async CT006PFPFDLAPLAPaddCaseApprovalv1_f48dc101c7e44aacb3ee7c4cceaaba29_d9wx8vva71y0008dq76g_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseApprovalv1_e8d06362f9414f2daea866767727f483_d9wx8vva71y0008dq770_AMR_Case_Approved') 
        async CT006PFPFDLAPLAPaddCaseApprovalv1_e8d06362f9414f2daea866767727f483_d9wx8vva71y0008dq770_AMR_Case_Approved(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseApprovalv1_18586e52cbf54d7aaa863c1bb1d49643_d9wx8vva71y0008dq77g_AMR_Case_Rejected') 
        async CT006PFPFDLAPLAPaddCaseApprovalv1_18586e52cbf54d7aaa863c1bb1d49643_d9wx8vva71y0008dq77g_AMR_Case_Rejected(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}