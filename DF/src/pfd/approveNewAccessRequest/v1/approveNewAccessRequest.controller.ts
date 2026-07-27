import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class approveNewAccessRequestController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewAccessRequestApprovalv1CT006PFPFDECPHRMapproveNewAccessRequestv1_46fa19eb79084ae6bcbacf4dcae74a12_7cc7a9eebea4076bc432e1d243f2a6ba111_RequestInitiated') 
        async CT006UFUFWECPHRMnewAccessRequestApprovalv1CT006PFPFDECPHRMapproveNewAccessRequestv1_46fa19eb79084ae6bcbacf4dcae74a12_7cc7a9eebea4076bc432e1d243f2a6ba111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMapproveNewAccessRequestv1_ff6a5bccd67643da8ccfb4582b688ace_d95k7f54bjhg008jcj10_RequestCompleted') 
        async CT006PFPFDECPHRMapproveNewAccessRequestv1_ff6a5bccd67643da8ccfb4582b688ace_d95k7f54bjhg008jcj10_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMapproveNewAccessRequestv1_f18719baffd9465bacc1afb7b33d7fe2_d95k7f54bjhg008jcj1g_Request_Approved') 
        async CT006PFPFDECPHRMapproveNewAccessRequestv1_f18719baffd9465bacc1afb7b33d7fe2_d95k7f54bjhg008jcj1g_Request_Approved(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMapproveNewAccessRequestv1_19fc15c16e9743cda8d4e4d481ba3d7d_d95k7f54bjhg008jcj20_Request_Rejected') 
        async CT006PFPFDECPHRMapproveNewAccessRequestv1_19fc15c16e9743cda8d4e4d481ba3d7d_d95k7f54bjhg008jcj20_Request_Rejected(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}