import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class performanceReviewDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMperformanceReviewDocumentv1CT006PFPFDECPHRMperformanceReviewDocumentv1_729547ef422c6aa873002badc63e39f1_4a26bfd979de2405ccdc7415513b64ae111_RequestInitiated') 
        async CT006UFUFWECPHRMperformanceReviewDocumentv1CT006PFPFDECPHRMperformanceReviewDocumentv1_729547ef422c6aa873002badc63e39f1_4a26bfd979de2405ccdc7415513b64ae111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMperformanceReviewDocDeletev1CT006PFPFDECPHRMperformanceReviewDocumentv1_729547ef422c6aa873002badc63e39f1_0aaf1c50778e796cb698c1e34f703deb111_RequestInitiated') 
        async CT006UFUFWECPHRMperformanceReviewDocDeletev1CT006PFPFDECPHRMperformanceReviewDocumentv1_729547ef422c6aa873002badc63e39f1_0aaf1c50778e796cb698c1e34f703deb111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMperformanceReviewDocumentv1_5e5e5f8c19bf5ac99221eab19c8a7808_241095aaa103411f89b8fc5d499ad698_RequestCompleted') 
        async CT006PFPFDECPHRMperformanceReviewDocumentv1_5e5e5f8c19bf5ac99221eab19c8a7808_241095aaa103411f89b8fc5d499ad698_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMperformanceReviewDocumentv1_a0964311001af94cd45d6f6ff73fae6a_bd879ec381d04e459707f36000079ec5_Document_Inserted') 
        async CT006PFPFDECPHRMperformanceReviewDocumentv1_a0964311001af94cd45d6f6ff73fae6a_bd879ec381d04e459707f36000079ec5_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMperformanceReviewDocumentv1_213a142e1d41b6580ba6de67e7fab740_aa435f89c80f4f86937ba46b72f2e9c1_Document_Deleted') 
        async CT006PFPFDECPHRMperformanceReviewDocumentv1_213a142e1d41b6580ba6de67e7fab740_aa435f89c80f4f86937ba46b72f2e9c1_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}