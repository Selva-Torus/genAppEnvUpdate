import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteCertificationTemplateStageController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteCertificationTemplateStagev1CT003PFPFDTAGTAGdeleteCertificationTemplateStagev1_7d998d66edbe4d6c8de07124887e4c0c_76b6501fcf1e418f8a35efaf8ef01d91111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteCertificationTemplateStagev1CT003PFPFDTAGTAGdeleteCertificationTemplateStagev1_7d998d66edbe4d6c8de07124887e4c0c_76b6501fcf1e418f8a35efaf8ef01d91111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteCertificationTemplateStagev1_16b39e2a4b8b43648b60adbfcd0ad96f_dav5s34zkz4g00878v50_Deleted') 
        async CT003PFPFDTAGTAGdeleteCertificationTemplateStagev1_16b39e2a4b8b43648b60adbfcd0ad96f_dav5s34zkz4g00878v50_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}