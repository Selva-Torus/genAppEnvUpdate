import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPwpsReturnAuthorizeProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSWPSreturnTransactionListv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_6a122ba63acf457d86c8942d103fce56111_AuthHT') 
        async CT005UFUFWGSSWPSreturnTransactionListv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_6a122ba63acf457d86c8942d103fce56111_AuthHT(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSWPSreturnInitiateReaonPopupv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_c356c42dd95e85dd525316553c199ff4111_AuthrizeReturn') 
        async CT005UFUFWGSSWPSreturnInitiateReaonPopupv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_c356c42dd95e85dd525316553c199ff4111_AuthrizeReturn(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSWPSrequestInitiateReasonPopupv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_a5589e8a971e1ada8030e507f4b89f56111_humantasknode_initiated') 
        async CT005UFUFWGSSWPSrequestInitiateReasonPopupv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_a5589e8a971e1ada8030e507f4b89f56111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSWPSrequestRefundTransactionListv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_883181a682acbf4a037a99fb00a7ae96111_humantasknode_initiated') 
        async CT005UFUFWGSSWPSrequestRefundTransactionListv1CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_912557c4450ea9c8781ae45a69009640_883181a682acbf4a037a99fb00a7ae96111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_d68609da83764eaab57f00f70f2732e2_d9xhgdsa71y0008dqxzg_Authrize2') 
        async CT005PFPFDGSSWPSwpsReturnAuthorizeProcessv1_d68609da83764eaab57f00f70f2732e2_d9xhgdsa71y0008dqxzg_Authrize2(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}