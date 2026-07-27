import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class backgroundCheckDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMbackgroundCheckDocumentv1CT006PFPFDECPHRMbackgroundCheckDocumentv1_7d5b9a2d175c69cdeae5f79e0f6cf283_3820bce8a63305c747dbee83cbb9fdc1111_RequestInitiated') 
        async CT006UFUFWECPHRMbackgroundCheckDocumentv1CT006PFPFDECPHRMbackgroundCheckDocumentv1_7d5b9a2d175c69cdeae5f79e0f6cf283_3820bce8a63305c747dbee83cbb9fdc1111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMbackgroundCheckDocDeletev1CT006PFPFDECPHRMbackgroundCheckDocumentv1_7d5b9a2d175c69cdeae5f79e0f6cf283_2bf6503088ed5dc4f11b1b567daba1e7111_RequestInitiated') 
        async CT006UFUFWECPHRMbackgroundCheckDocDeletev1CT006PFPFDECPHRMbackgroundCheckDocumentv1_7d5b9a2d175c69cdeae5f79e0f6cf283_2bf6503088ed5dc4f11b1b567daba1e7111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMbackgroundCheckDocumentv1_9651481d797d4ce9be9737be07f8b35a_c0f64763be4b42558a62fdc549b46dbf_RequestCompleted') 
        async CT006PFPFDECPHRMbackgroundCheckDocumentv1_9651481d797d4ce9be9737be07f8b35a_c0f64763be4b42558a62fdc549b46dbf_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMbackgroundCheckDocumentv1_d57b16001fda87f11093d2a44488b5d6_d64c0b9f67394e4d8c173ade698e785b_Document_Inserted') 
        async CT006PFPFDECPHRMbackgroundCheckDocumentv1_d57b16001fda87f11093d2a44488b5d6_d64c0b9f67394e4d8c173ade698e785b_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMbackgroundCheckDocumentv1_fda5208b9e5726233c8e86d416801f67_45fcafa3967f4c06aa317149f54a8baa_Document_Deleted') 
        async CT006PFPFDECPHRMbackgroundCheckDocumentv1_fda5208b9e5726233c8e86d416801f67_45fcafa3967f4c06aa317149f54a8baa_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}