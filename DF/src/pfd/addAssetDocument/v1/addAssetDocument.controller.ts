import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addAssetDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddAssetDocumentv1CT006PFPFDECPAMSaddAssetDocumentv1_012e23cd0f2d485b88c1ff6d9e6aaa5d_f9b4eabd91a1420bb1fb08b0595fde68111_RequestInitiated') 
        async CT006UFUFWECPAMSaddAssetDocumentv1CT006PFPFDECPAMSaddAssetDocumentv1_012e23cd0f2d485b88c1ff6d9e6aaa5d_f9b4eabd91a1420bb1fb08b0595fde68111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSassetDocDeletev1CT006PFPFDECPAMSaddAssetDocumentv1_012e23cd0f2d485b88c1ff6d9e6aaa5d_c2ed01e6feaabe76c218c01ec04e6d7f111_RequestInitiated') 
        async CT006UFUFWECPAMSassetDocDeletev1CT006PFPFDECPAMSaddAssetDocumentv1_012e23cd0f2d485b88c1ff6d9e6aaa5d_c2ed01e6feaabe76c218c01ec04e6d7f111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetDocumentv1_974c9c8fa0f64b2fadd8d9cae64c40b4_d8s4g6gh19pg008dktjg_RequestCompleted') 
        async CT006PFPFDECPAMSaddAssetDocumentv1_974c9c8fa0f64b2fadd8d9cae64c40b4_d8s4g6gh19pg008dktjg_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetDocumentv1_74cb58d5cbb348a7975e03cf4896eb8c_d8qz9tff1tdg008zk0bg_Document_Inserted') 
        async CT006PFPFDECPAMSaddAssetDocumentv1_74cb58d5cbb348a7975e03cf4896eb8c_d8qz9tff1tdg008zk0bg_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetDocumentv1_cc0dba7bcf29473ea7f306f684362443_d8s4g6gh19pg008dktkg_Document_Deleted') 
        async CT006PFPFDECPAMSaddAssetDocumentv1_cc0dba7bcf29473ea7f306f684362443_d8s4g6gh19pg008dktkg_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}