import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addCaseController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWLAPLAPaddCasev1CT006PFPFDLAPLAPaddCasev1_e06a7a667dcb4c248f796cddc5428476_270a2993d12946e4bac669e5d750112f111_humantasknode_initiated') 
        async CT006UFUFWLAPLAPaddCasev1CT006PFPFDLAPLAPaddCasev1_e06a7a667dcb4c248f796cddc5428476_270a2993d12946e4bac669e5d750112f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_adcefe1e09234768b05688f32fcf7a00_d9t4m1ga71y0008xbdz0_get_status_id_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_adcefe1e09234768b05688f32fcf7a00_d9t4m1ga71y0008xbdz0_get_status_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_8490d029ec7747b79a40cdbeb276ac58_d9t4m1ga71y0008xbdzg_get_priority_id_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_8490d029ec7747b79a40cdbeb276ac58_d9t4m1ga71y0008xbdzg_get_priority_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_b1e9e97da85d4bbdbf50636271e497d0_d9t4m1ga71y0008xbe00_get_attorney_id_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_b1e9e97da85d4bbdbf50636271e497d0_d9t4m1ga71y0008xbe00_get_attorney_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_35628e10bcdd4b54a751bd8be59e9789_d9t4m1ga71y0008xbe0g_post_creditor_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_35628e10bcdd4b54a751bd8be59e9789_d9t4m1ga71y0008xbe0g_post_creditor_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_4b83ef9cc26043918eb18fbd1134f510_d9t4m1ga71y0008xbe10_post_venue_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_4b83ef9cc26043918eb18fbd1134f510_d9t4m1ga71y0008xbe10_post_venue_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_1009a1bfe1bc4887997c32212b482ef8_d9t4m1ga71y0008xbe1g_post_accounts_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_1009a1bfe1bc4887997c32212b482ef8_d9t4m1ga71y0008xbe1g_post_accounts_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_fadeefa1ba424ba48a5b4615afb7cf39_d9t8m38a71y0008xde40_post_documents_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_fadeefa1ba424ba48a5b4615afb7cf39_d9t8m38a71y0008xde40_post_documents_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDLAPLAPaddCasev1_8fb84ada5996442c9bd7dcffc3d573ec_d9t8m38a71y0008xde4g_post_checklist_item_status_initiated') 
        async CT006PFPFDLAPLAPaddCasev1_8fb84ada5996442c9bd7dcffc3d573ec_d9t8m38a71y0008xde4g_post_checklist_item_status_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}