import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPnfTranmainInitiationSaveController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXnfCancelRequestCamt055v1CT005PFPFDGSSSMXnfTranmainInitiationSavev1_baca8b7b60ad4840a0d511c2a7f538f4_ecc76680373d12f2b23811e9cb946cc8111_nfranmainnsertognsertprocess_initiated') 
        async CT005UFUFWGSSSMXnfCancelRequestCamt055v1CT005PFPFDGSSSMXnfTranmainInitiationSavev1_baca8b7b60ad4840a0d511c2a7f538f4_ecc76680373d12f2b23811e9cb946cc8111_nfranmainnsertognsertprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfInvestigationRequestCamt110v1CT005PFPFDGSSSMXnfTranmainInitiationSavev1_baca8b7b60ad4840a0d511c2a7f538f4_5b1203d035743ccd3acec36ec0086b45111_nfranmainnsertognsertprocess_initiated') 
        async CT005UFUFWGSSSMXnfInvestigationRequestCamt110v1CT005PFPFDGSSSMXnfTranmainInitiationSavev1_baca8b7b60ad4840a0d511c2a7f538f4_5b1203d035743ccd3acec36ec0086b45111_nfranmainnsertognsertprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfInvestigationResponseCamt111v1CT005PFPFDGSSSMXnfTranmainInitiationSavev1_baca8b7b60ad4840a0d511c2a7f538f4_0c268719e8a3a2f8f88cebfee8936a0c111_nfranmainnsertognsertprocess_initiated') 
        async CT005UFUFWGSSSMXnfInvestigationResponseCamt111v1CT005PFPFDGSSSMXnfTranmainInitiationSavev1_baca8b7b60ad4840a0d511c2a7f538f4_0c268719e8a3a2f8f88cebfee8936a0c111_nfranmainnsertognsertprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfTranmainInitiationSavev1_7874fe17a50644a090e90212fcb3dcde_d8wh9tq2y8wg0089z5h0_nf_tran_insert_initiated') 
        async CT005PFPFDGSSSMXnfTranmainInitiationSavev1_7874fe17a50644a090e90212fcb3dcde_d8wh9tq2y8wg0089z5h0_nf_tran_insert_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfTranmainInitiationSavev1_3ff0cd3cab864af78048003ba14c7140_d8wh9tq2y8wg0089z5gg_log_insert_initiated') 
        async CT005PFPFDGSSSMXnfTranmainInitiationSavev1_3ff0cd3cab864af78048003ba14c7140_d8wh9tq2y8wg0089z5gg_log_insert_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfTranmainInitiationSavev1_828c9ccb22264ef183db1d6cdc2ca820_d8wh9tq2y8wg0089z5hg_tran_update_initiated') 
        async CT005PFPFDGSSSMXnfTranmainInitiationSavev1_828c9ccb22264ef183db1d6cdc2ca820_d8wh9tq2y8wg0089z5hg_tran_update_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}