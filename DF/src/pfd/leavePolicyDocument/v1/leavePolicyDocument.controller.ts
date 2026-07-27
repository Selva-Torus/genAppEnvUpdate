import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class leavePolicyDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMleavePolicyDocumentv1CT006PFPFDECPHRMleavePolicyDocumentv1_cb614b66a924e08332cb3c28e619cbcb_b1318de0bf44a27d738396173cbc4540111_RequestInitiated') 
        async CT006UFUFWECPHRMleavePolicyDocumentv1CT006PFPFDECPHRMleavePolicyDocumentv1_cb614b66a924e08332cb3c28e619cbcb_b1318de0bf44a27d738396173cbc4540111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMleavePolicyDocDeletev1CT006PFPFDECPHRMleavePolicyDocumentv1_cb614b66a924e08332cb3c28e619cbcb_c774fd6a41008dbdd61a0fe3a75435a9111_RequestInitiated') 
        async CT006UFUFWECPHRMleavePolicyDocDeletev1CT006PFPFDECPHRMleavePolicyDocumentv1_cb614b66a924e08332cb3c28e619cbcb_c774fd6a41008dbdd61a0fe3a75435a9111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMleavePolicyDocumentv1_dbc1c6ee5e29352d1da8d1e89ec70d7f_4d96f635196d45279474b2b434c07371_RequestCompleted') 
        async CT006PFPFDECPHRMleavePolicyDocumentv1_dbc1c6ee5e29352d1da8d1e89ec70d7f_4d96f635196d45279474b2b434c07371_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMleavePolicyDocumentv1_52ac8c1693c17fc87e493f3c614ee79a_cd6090ddb0f7463c96985440a67d63ce_Document_Inserted') 
        async CT006PFPFDECPHRMleavePolicyDocumentv1_52ac8c1693c17fc87e493f3c614ee79a_cd6090ddb0f7463c96985440a67d63ce_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMleavePolicyDocumentv1_de4955571f38d691d8d192b6cfb0b390_3aa962fc1ba74bb1b2807c4d7cecd0ef_Document_Deleted') 
        async CT006PFPFDECPHRMleavePolicyDocumentv1_de4955571f38d691d8d192b6cfb0b390_3aa962fc1ba74bb1b2807c4d7cecd0ef_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}