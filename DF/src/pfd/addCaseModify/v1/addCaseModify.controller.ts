import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addCaseModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWLAPLAPaddCasev1CT006PFPFDLAPLAPaddCaseModifyv1_0e0bdf7a825009b09c761a1fe3446c97_8d5bfb4b669e469399d7df36ac0294f0112_humantasknode_initiated') 
        async CT006UFUFWLAPLAPaddCasev1CT006PFPFDLAPLAPaddCaseModifyv1_0e0bdf7a825009b09c761a1fe3446c97_8d5bfb4b669e469399d7df36ac0294f0112_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_be42c05be9370383172480fdab2c51ef_d9t5gh2a71y0008xbmgg_get_status_id_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_be42c05be9370383172480fdab2c51ef_d9t5gh2a71y0008xbmgg_get_status_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_cd41c18ad8481d2d0587fb8fa73f56cb_d9t5gh2a71y0008xbmh0_get_priority_id_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_cd41c18ad8481d2d0587fb8fa73f56cb_d9t5gh2a71y0008xbmh0_get_priority_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_0ce50986af70d04dc9376bd956167ec9_d9t5gh2a71y0008xbmhg_get_attorney_id_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_0ce50986af70d04dc9376bd956167ec9_d9t5gh2a71y0008xbmhg_get_attorney_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_068760568fc3a04b136d5f342d8584b2_d9t5gh2a71y0008xbmj0_patch_creditor_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_068760568fc3a04b136d5f342d8584b2_d9t5gh2a71y0008xbmj0_patch_creditor_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_c7f898631041b25e913d6d580e788f29_d9t5gh2a71y0008xbmjg_patch_venue_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_c7f898631041b25e913d6d580e788f29_d9t5gh2a71y0008xbmjg_patch_venue_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_7f96504045642e66a862fc274c7ece06_d9t5gh2a71y0008xbmk0_patch_accounts_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_7f96504045642e66a862fc274c7ece06_d9t5gh2a71y0008xbmk0_patch_accounts_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_d4f05aadb2d04831a8103ebaa26c8934_d9t8w5ga71y0008xdmng_patch_documents_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_d4f05aadb2d04831a8103ebaa26c8934_d9t8w5ga71y0008xdmng_patch_documents_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCaseModifyv1_6963ffd89f314cdf96092768cec216b6_d9t8w5ga71y0008xdmp0_patch_checklist_item_status_initiated') 
        async CT006PFPFDLAPLAPaddCaseModifyv1_6963ffd89f314cdf96092768cec216b6_d9t8w5ga71y0008xdmp0_patch_checklist_item_status_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}