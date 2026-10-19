import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPAddEvidenceAttachmentController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGattachEvidencev1CT003PFPFDTAGTAGAddEvidenceAttachmentv1_396e35f2fb1341c091034eaff056e31c_e6d53f83bb144ac0addf3ba991e7661f111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGattachEvidencev1CT003PFPFDTAGTAGAddEvidenceAttachmentv1_396e35f2fb1341c091034eaff056e31c_e6d53f83bb144ac0addf3ba991e7661f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGattachEvidencev1CT003PFPFDTAGTAGAddEvidenceAttachmentv1_396e35f2fb1341c091034eaff056e31c_161d3ca284fd420cb11ec64c1acfd61c111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGattachEvidencev1CT003PFPFDTAGTAGAddEvidenceAttachmentv1_396e35f2fb1341c091034eaff056e31c_161d3ca284fd420cb11ec64c1acfd61c111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGAddEvidenceAttachmentv1_ab0a7b3300884e22b43e026e32291589_db4yw5rrvk9000860zeg_decisionnode_initiated') 
        async CT003PFPFDTAGTAGAddEvidenceAttachmentv1_ab0a7b3300884e22b43e026e32291589_db4yw5rrvk9000860zeg_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGAddEvidenceAttachmentv1_52ae740451264243b08974064a08d7c2_db8djykrvk9000865zjg_delete_attachment') 
        async CT003PFPFDTAGTAGAddEvidenceAttachmentv1_52ae740451264243b08974064a08d7c2_db8djykrvk9000865zjg_delete_attachment(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGAddEvidenceAttachmentv1_2d97105002c84a9c97242f352ae59d27_db8dyd9rvk90008664g0_upload_attachment') 
        async CT003PFPFDTAGTAGAddEvidenceAttachmentv1_2d97105002c84a9c97242f352ae59d27_db8dyd9rvk90008664g0_upload_attachment(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}