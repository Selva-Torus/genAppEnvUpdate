import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addPositionDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaddPositionDocumentv1CT006PFPFDECPHRMaddPositionDocumentv1_e3c74778f4f51177e8beb7f45d9c9574_7def11bf10de8c12af22545b1fe90946111_RequestInitiated') 
        async CT006UFUFWECPHRMaddPositionDocumentv1CT006PFPFDECPHRMaddPositionDocumentv1_e3c74778f4f51177e8beb7f45d9c9574_7def11bf10de8c12af22545b1fe90946111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMpositionDocDeletev1CT006PFPFDECPHRMaddPositionDocumentv1_e3c74778f4f51177e8beb7f45d9c9574_20050074fa922c4328d09efcdf218f07111_RequestInitiated') 
        async CT006UFUFWECPHRMpositionDocDeletev1CT006PFPFDECPHRMaddPositionDocumentv1_e3c74778f4f51177e8beb7f45d9c9574_20050074fa922c4328d09efcdf218f07111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPositionDocumentv1_72a759f11f73db301d8f877dae2679e2_d8sr7wf2ebc00088ykt0_RequestCompleted') 
        async CT006PFPFDECPHRMaddPositionDocumentv1_72a759f11f73db301d8f877dae2679e2_d8sr7wf2ebc00088ykt0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPositionDocumentv1_9ef80065ba36dbad9fab36350701c47c_d8sr7wf2ebc00088yktg_Document_Inserted') 
        async CT006PFPFDECPHRMaddPositionDocumentv1_9ef80065ba36dbad9fab36350701c47c_d8sr7wf2ebc00088yktg_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPositionDocumentv1_1c918c0ec2e15b8f32ffe79957ad1b29_d8sr7wf2ebc00088ykv0_Document_Deleted') 
        async CT006PFPFDECPHRMaddPositionDocumentv1_1c918c0ec2e15b8f32ffe79957ad1b29_d8sr7wf2ebc00088ykv0_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}