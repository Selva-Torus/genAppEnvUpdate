import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteCertificateTemplateController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteCertificateTemplatev1CT003PFPFDTAGTAGdeleteCertificateTemplatev1_cbe314a0b63f41eab69ccbac36e4c985_a8a60c60cc994b64a7738dbe7a1ce26e111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteCertificateTemplatev1CT003PFPFDTAGTAGdeleteCertificateTemplatev1_cbe314a0b63f41eab69ccbac36e4c985_a8a60c60cc994b64a7738dbe7a1ce26e111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteCertificateTemplatev1_9d675fa7fa7d4e8695797d613f215951_dav24zkzkz4g008xmjf0_deleted') 
        async CT003PFPFDTAGTAGdeleteCertificateTemplatev1_9d675fa7fa7d4e8695797d613f215951_dav24zkzkz4g008xmjf0_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}