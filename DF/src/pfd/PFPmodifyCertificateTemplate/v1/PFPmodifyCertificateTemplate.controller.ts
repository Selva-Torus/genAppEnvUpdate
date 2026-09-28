import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyCertificateTemplateController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCertificateTemplatev1CT003PFPFDTAGTAGmodifyCertificateTemplatev1_94f9f03d145e42b48cad4eeac438eb01_cdb223333b494abe9546e6bc9fed7e8a111_Updatesuccess') 
        async CT003UFUFWTAGTAGaddCertificateTemplatev1CT003PFPFDTAGTAGmodifyCertificateTemplatev1_94f9f03d145e42b48cad4eeac438eb01_cdb223333b494abe9546e6bc9fed7e8a111_Updatesuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCertificateTemplatev1_760088bd9cc4464f935604abcb7f3407_dav2468zkz4g008xmj90_Updatesuccess') 
        async CT003PFPFDTAGTAGmodifyCertificateTemplatev1_760088bd9cc4464f935604abcb7f3407_dav2468zkz4g008xmj90_Updatesuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}