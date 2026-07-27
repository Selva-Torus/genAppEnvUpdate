import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class accessReqDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaccessRequestDocumentv1CT006PFPFDECPHRMaccessReqDocumentv1_d39229e9d68dc41c4192ec17feb9ffbb_7f0a98458f44ef1e6f1a5d8b7a31ee80111_RequestInitiated') 
        async CT006UFUFWECPHRMaccessRequestDocumentv1CT006PFPFDECPHRMaccessReqDocumentv1_d39229e9d68dc41c4192ec17feb9ffbb_7f0a98458f44ef1e6f1a5d8b7a31ee80111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMaccessReqDocDeletev1CT006PFPFDECPHRMaccessReqDocumentv1_d39229e9d68dc41c4192ec17feb9ffbb_f8191cfbb8f0bd60326a5af144b53062111_RequestInitiated') 
        async CT006UFUFWECPHRMaccessReqDocDeletev1CT006PFPFDECPHRMaccessReqDocumentv1_d39229e9d68dc41c4192ec17feb9ffbb_f8191cfbb8f0bd60326a5af144b53062111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaccessReqDocumentv1_3580e3393f51a7448d65578083808538_98eb102ab5364e949813d47ce420e4fe_RequestCompleted') 
        async CT006PFPFDECPHRMaccessReqDocumentv1_3580e3393f51a7448d65578083808538_98eb102ab5364e949813d47ce420e4fe_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaccessReqDocumentv1_192f20fd7aff10b33419cebe2e245ba6_02ddfb1655c04dab8d77698d6c3565ee_Document_Inserted') 
        async CT006PFPFDECPHRMaccessReqDocumentv1_192f20fd7aff10b33419cebe2e245ba6_02ddfb1655c04dab8d77698d6c3565ee_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaccessReqDocumentv1_c9a4393f50310b467181bb4853a4017e_efe1fe9ab3c643ab8b7fd80a9390b403_Document_Deleted') 
        async CT006PFPFDECPHRMaccessReqDocumentv1_c9a4393f50310b467181bb4853a4017e_efe1fe9ab3c643ab8b7fd80a9390b403_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}