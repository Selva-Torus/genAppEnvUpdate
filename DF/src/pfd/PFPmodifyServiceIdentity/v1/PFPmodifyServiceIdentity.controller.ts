import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyServiceIdentityController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddServiceIdentityv1CT003PFPFDTAGTAGmodifyServiceIdentityv1_ccf6015057b580ce9c6c22d472c3fd5b_db090daaad016432a22a0f87bc46ff8e111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddServiceIdentityv1CT003PFPFDTAGTAGmodifyServiceIdentityv1_ccf6015057b580ce9c6c22d472c3fd5b_db090daaad016432a22a0f87bc46ff8e111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteServiceIdentityv1CT003PFPFDTAGTAGmodifyServiceIdentityv1_ccf6015057b580ce9c6c22d472c3fd5b_158770f92677639723e0ae3ae77070a5111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteServiceIdentityv1CT003PFPFDTAGTAGmodifyServiceIdentityv1_ccf6015057b580ce9c6c22d472c3fd5b_158770f92677639723e0ae3ae77070a5111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyServiceIdentityv1_8e0446ee8f6e40f2048c84b25f7eb21d_dbsb7xqg5z8g008c7f90_dec_update_or_delete_initiated') 
        async CT003PFPFDTAGTAGmodifyServiceIdentityv1_8e0446ee8f6e40f2048c84b25f7eb21d_dbsb7xqg5z8g008c7f90_dec_update_or_delete_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyServiceIdentityv1_338ba0ef7b1e85c2cc92c66a6a2d8019_dbsb7xqg5z8g008c7f9g_Identity_Deleted') 
        async CT003PFPFDTAGTAGmodifyServiceIdentityv1_338ba0ef7b1e85c2cc92c66a6a2d8019_dbsb7xqg5z8g008c7f9g_Identity_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyServiceIdentityv1_d22df85058df4262a8a6f77330abd175_dbsb5sfg5z8g008c776g_Identity_Modified') 
        async CT003PFPFDTAGTAGmodifyServiceIdentityv1_d22df85058df4262a8a6f77330abd175_dbsb5sfg5z8g008c776g_Identity_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyServiceIdentityv1_c1b645dec90f46afade9b73502e91cc9_dbsb5sfg5z8g008c7770_upadate_ref_name_initiated') 
        async CT003PFPFDTAGTAGmodifyServiceIdentityv1_c1b645dec90f46afade9b73502e91cc9_dbsb5sfg5z8g008c7770_upadate_ref_name_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyServiceIdentityv1_093b044322cfa06cd87db5a5190865e4_dbsb7xqg5z8g008c7fb0_update_identity_initiated') 
        async CT003PFPFDTAGTAGmodifyServiceIdentityv1_093b044322cfa06cd87db5a5190865e4_dbsb7xqg5z8g008c7fb0_update_identity_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}