import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class TOB_Consent_Event_OperationController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT003PFPFDTrsTOBTOBConsentEventOperationv1_3c24f87cd9a34d8eb45f0134a3d1f219_d6qbqrf4hjv0008w7g70_RequestInitiated') 
        async CT003PFPFDTrsTOBTOBConsentEventOperationv1_3c24f87cd9a34d8eb45f0134a3d1f219_d6qbqrf4hjv0008w7g70_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTrsTOBTOBConsentEventOperationv1_e72d151373d74526815c6e151f7cc579_d6qbqrf4hjv0008w7g7g_RequestCompleted') 
        async CT003PFPFDTrsTOBTOBConsentEventOperationv1_e72d151373d74526815c6e151f7cc579_d6qbqrf4hjv0008w7g7g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTrsTOBTOBConsentEventOperationv1_33e9b9bf15cc42339c2253d93f1360a4_d6qbqrf4hjv0008w7g80_TOB_Consent_RequestCompleted') 
        async CT003PFPFDTrsTOBTOBConsentEventOperationv1_33e9b9bf15cc42339c2253d93f1360a4_d6qbqrf4hjv0008w7g80_TOB_Consent_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}