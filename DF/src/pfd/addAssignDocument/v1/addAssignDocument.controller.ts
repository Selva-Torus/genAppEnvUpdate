import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addAssignDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddAssignmentDocumentv1CT006PFPFDECPAMSaddAssignDocumentv1_6859f478f5da4cc48edcda13756696b2_7ef1bb0dbb67951ca685cecdd118e522111_RequestInitiated') 
        async CT006UFUFWECPAMSaddAssignmentDocumentv1CT006PFPFDECPAMSaddAssignDocumentv1_6859f478f5da4cc48edcda13756696b2_7ef1bb0dbb67951ca685cecdd118e522111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSassignDocDeletev1CT006PFPFDECPAMSaddAssignDocumentv1_6859f478f5da4cc48edcda13756696b2_c768cc3ab03ff74fe59ac325ffac63df111_RequestInitiated') 
        async CT006UFUFWECPAMSassignDocDeletev1CT006PFPFDECPAMSaddAssignDocumentv1_6859f478f5da4cc48edcda13756696b2_c768cc3ab03ff74fe59ac325ffac63df111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssignDocumentv1_b2e0975c56fa44f5a619e00f8651667f_d8sr7642ebc00088yjwg_RequestCompleted') 
        async CT006PFPFDECPAMSaddAssignDocumentv1_b2e0975c56fa44f5a619e00f8651667f_d8sr7642ebc00088yjwg_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssignDocumentv1_325c7fe3c7bd43959352397ebc84ef85_d8rmbq6h19pg008dk2hg_Document_Inserted') 
        async CT006PFPFDECPAMSaddAssignDocumentv1_325c7fe3c7bd43959352397ebc84ef85_d8rmbq6h19pg008dk2hg_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssignDocumentv1_5d0cb42a56e645aeb0a8e6628a10364d_d8sr7642ebc00088yjxg_Document_Deleted') 
        async CT006PFPFDECPAMSaddAssignDocumentv1_5d0cb42a56e645aeb0a8e6628a10364d_d8sr7642ebc00088yjxg_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}