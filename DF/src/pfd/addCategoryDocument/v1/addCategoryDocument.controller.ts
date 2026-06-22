import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addCategoryDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddCategoryDocumentv1CT006PFPFDECPAMSaddCategoryDocumentv1_8124bff30627f7480d9bfbc9e8b48b43_2c09d388ef1797fa2e26593fcce24b11111_RequestInitiated') 
        async CT006UFUFWECPAMSaddCategoryDocumentv1CT006PFPFDECPAMSaddCategoryDocumentv1_8124bff30627f7480d9bfbc9e8b48b43_2c09d388ef1797fa2e26593fcce24b11111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMScategoryDocDeletev1CT006PFPFDECPAMSaddCategoryDocumentv1_8124bff30627f7480d9bfbc9e8b48b43_9da01c4573caa2dffd3e058cd11dbb84111_RequestInitiated') 
        async CT006UFUFWECPAMScategoryDocDeletev1CT006PFPFDECPAMSaddCategoryDocumentv1_8124bff30627f7480d9bfbc9e8b48b43_9da01c4573caa2dffd3e058cd11dbb84111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryDocumentv1_94fe8d7bea8b0b389ba64be0fe4a197c_d8td2zvrvxrg008vs17g_RequestCompleted') 
        async CT006PFPFDECPAMSaddCategoryDocumentv1_94fe8d7bea8b0b389ba64be0fe4a197c_d8td2zvrvxrg008vs17g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryDocumentv1_36eaa2a265b45d6c4d0ba4a21d10f64e_d8td2zvrvxrg008vs180_Document_Inserted') 
        async CT006PFPFDECPAMSaddCategoryDocumentv1_36eaa2a265b45d6c4d0ba4a21d10f64e_d8td2zvrvxrg008vs180_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryDocumentv1_e1afdbe35e6a8719e30c4bd023100f96_d8td2zvrvxrg008vs18g_Document_Deleted') 
        async CT006PFPFDECPAMSaddCategoryDocumentv1_e1afdbe35e6a8719e30c4bd023100f96_d8td2zvrvxrg008vs18g_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}