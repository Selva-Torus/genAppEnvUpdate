import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addGradeDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaddGradeDocumentv1CT006PFPFDECPHRMaddGradeDocumentv1_31b84bc7161e97a5c5888ed8ba781a3f_367620eb90efa5e41d986cb4c03c82a5111_RequestInitiated') 
        async CT006UFUFWECPHRMaddGradeDocumentv1CT006PFPFDECPHRMaddGradeDocumentv1_31b84bc7161e97a5c5888ed8ba781a3f_367620eb90efa5e41d986cb4c03c82a5111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMgradeDocDeletev1CT006PFPFDECPHRMaddGradeDocumentv1_31b84bc7161e97a5c5888ed8ba781a3f_5ce27395f677d27616863ba357929afd111_RequestInitiated') 
        async CT006UFUFWECPHRMgradeDocDeletev1CT006PFPFDECPHRMaddGradeDocumentv1_31b84bc7161e97a5c5888ed8ba781a3f_5ce27395f677d27616863ba357929afd111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddGradeDocumentv1_ebef9ae900e545927dd2d64151efb917_d8ssb742ebc00088z74g_RequestCompleted') 
        async CT006PFPFDECPHRMaddGradeDocumentv1_ebef9ae900e545927dd2d64151efb917_d8ssb742ebc00088z74g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddGradeDocumentv1_f4e0a8a7bc9f181cabb38e101967f0ff_d8ssb742ebc00088z750_Document_Inserted') 
        async CT006PFPFDECPHRMaddGradeDocumentv1_f4e0a8a7bc9f181cabb38e101967f0ff_d8ssb742ebc00088z750_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddGradeDocumentv1_17c8d4033bb31339589e8c84c63efa33_d8ssb742ebc00088z75g_Document_Deleted') 
        async CT006PFPFDECPHRMaddGradeDocumentv1_17c8d4033bb31339589e8c84c63efa33_d8ssb742ebc00088z75g_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}