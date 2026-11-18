import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddCertificationTemplateStageController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCertificationStagev1CT003PFPFDTAGTAGaddCertificationTemplateStagev1_f750ba55a1b44aa5a7b9ed5fef52ee10_8435390bab624176bc0271931a361e51111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCertificationStagev1CT003PFPFDTAGTAGaddCertificationTemplateStagev1_f750ba55a1b44aa5a7b9ed5fef52ee10_8435390bab624176bc0271931a361e51111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCertificationTemplateStagev1_47fff66a07be490eb588c5e73ed24ec4_daxmnszzkz4g0087bm70_Save_success') 
        async CT003PFPFDTAGTAGaddCertificationTemplateStagev1_47fff66a07be490eb588c5e73ed24ec4_daxmnszzkz4g0087bm70_Save_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCertificationTemplateStagev1_c98248c45c054a6ba8e7500dd8562ab1_dav5pxkzkz4g00878sx0_Save') 
        async CT003PFPFDTAGTAGaddCertificationTemplateStagev1_c98248c45c054a6ba8e7500dd8562ab1_dav5pxkzkz4g00878sx0_Save(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}