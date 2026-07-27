import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class employeesDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMemployeesDocumentv1CT006PFPFDECPHRMemployeesDocumentv1_019902226960796cfb6dba60189c74c7_cc2103a73d9824fbfdbfe66c7d77c20b111_RequestInitiated') 
        async CT006UFUFWECPHRMemployeesDocumentv1CT006PFPFDECPHRMemployeesDocumentv1_019902226960796cfb6dba60189c74c7_cc2103a73d9824fbfdbfe66c7d77c20b111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMemployeeDocDeletev1CT006PFPFDECPHRMemployeesDocumentv1_019902226960796cfb6dba60189c74c7_69be76271ad813049b5b8e69584c9ba6111_RequestInitiated') 
        async CT006UFUFWECPHRMemployeeDocDeletev1CT006PFPFDECPHRMemployeesDocumentv1_019902226960796cfb6dba60189c74c7_69be76271ad813049b5b8e69584c9ba6111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMemployeesDocumentv1_d3ca5bf0a52279c8ccfc0de34cec54eb_f0e5c17931004e6ca38e2fdd86bb02a3_RequestCompleted') 
        async CT006PFPFDECPHRMemployeesDocumentv1_d3ca5bf0a52279c8ccfc0de34cec54eb_f0e5c17931004e6ca38e2fdd86bb02a3_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMemployeesDocumentv1_a56b20ec90668a31833cd8d8fbe4ce66_84d9db262ce249478721dd479551b3b5_Document_Inserted') 
        async CT006PFPFDECPHRMemployeesDocumentv1_a56b20ec90668a31833cd8d8fbe4ce66_84d9db262ce249478721dd479551b3b5_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMemployeesDocumentv1_a80ff0e632d98631a8a73978f3039b28_635baff7573b44188eb1b52fe77db63f_Document_Deleted') 
        async CT006PFPFDECPHRMemployeesDocumentv1_a80ff0e632d98631a8a73978f3039b28_635baff7573b44188eb1b52fe77db63f_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}