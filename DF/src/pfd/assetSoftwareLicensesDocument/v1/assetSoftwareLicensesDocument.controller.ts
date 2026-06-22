import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assetSoftwareLicensesDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddSoftwareLicensesDocumentv1CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_acdf3061313a73050ef35b4f6c0e5ada_b2c58d98397153555ce070746df7c1b7111_RequestInitiated') 
        async CT006UFUFWECPAMSaddSoftwareLicensesDocumentv1CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_acdf3061313a73050ef35b4f6c0e5ada_b2c58d98397153555ce070746df7c1b7111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSlicenseDocDeletev1CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_acdf3061313a73050ef35b4f6c0e5ada_8f89d0367db48f075599f2b8db9beee5111_RequestInitiated') 
        async CT006UFUFWECPAMSlicenseDocDeletev1CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_acdf3061313a73050ef35b4f6c0e5ada_8f89d0367db48f075599f2b8db9beee5111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_5a2277cdec1828212237072fe6b503b1_d8te6zvrvxrg008vscd0_RequestCompleted') 
        async CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_5a2277cdec1828212237072fe6b503b1_d8te6zvrvxrg008vscd0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_3745c40a57d402ac59b007ed6bd60230_d8te6zvrvxrg008vscdg_Document_Inserted') 
        async CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_3745c40a57d402ac59b007ed6bd60230_d8te6zvrvxrg008vscdg_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_919ebaefb996b6224e8567d0305682ec_d8te6zvrvxrg008vsce0_Document_Deleted') 
        async CT006PFPFDECPAMSassetSoftwareLicensesDocumentv1_919ebaefb996b6224e8567d0305682ec_d8te6zvrvxrg008vsce0_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}