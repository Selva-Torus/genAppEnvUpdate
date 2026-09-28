import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddEvidencePackController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGauditEvidencev1CT003PFPFDTAGTAGaddEvidencePackv1_e822ce161bb0fed6d6150dd17dcb4e60_70fa2d2ee44b4f82a612a580e50339c9111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGauditEvidencev1CT003PFPFDTAGTAGaddEvidencePackv1_e822ce161bb0fed6d6150dd17dcb4e60_70fa2d2ee44b4f82a612a580e50339c9111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddEvidencePackv1_2124c9cce36840ec8fc4ace14e52da26_das3gntzkz4g008xd8r0_apinode_initiated') 
        async CT003PFPFDTAGTAGaddEvidencePackv1_2124c9cce36840ec8fc4ace14e52da26_das3gntzkz4g008xd8r0_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddEvidencePackv1_38289d6d0957f20c8667e18dedfc93c2_das36chh1bp0008fcvcg_post_evidence_pack_Success') 
        async CT003PFPFDTAGTAGaddEvidencePackv1_38289d6d0957f20c8667e18dedfc93c2_das36chh1bp0008fcvcg_post_evidence_pack_Success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}