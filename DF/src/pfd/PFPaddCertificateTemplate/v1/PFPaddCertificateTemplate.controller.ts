import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddCertificateTemplateController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCertificateTemplatev1CT003PFPFDTAGTAGaddCertificateTemplatev1_328beaf983a545bca567a50d736cb6ea_19bc24ffe68d44fabd61c1319347ae94111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCertificateTemplatev1CT003PFPFDTAGTAGaddCertificateTemplatev1_328beaf983a545bca567a50d736cb6ea_19bc24ffe68d44fabd61c1319347ae94111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCertificateTemplatev1_8a889249a1fb489cbc6fad8efbdcd9a8_dav2344zkz4g008xmhx0_SaveSuccess') 
        async CT003PFPFDTAGTAGaddCertificateTemplatev1_8a889249a1fb489cbc6fad8efbdcd9a8_dav2344zkz4g008xmhx0_SaveSuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}