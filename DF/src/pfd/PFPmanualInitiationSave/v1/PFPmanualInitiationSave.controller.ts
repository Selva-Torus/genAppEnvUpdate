import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmanualInitiationSaveController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSavev1_38c2daa3ef364c829409d99c0f2ac44a_f6a4e749f5e24047b0e62c94a5c62f33111_HT_SAVE_INITIATED') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSavev1_38c2daa3ef364c829409d99c0f2ac44a_f6a4e749f5e24047b0e62c94a5c62f33111_HT_SAVE_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSavev1_38c2daa3ef364c829409d99c0f2ac44a_4c6f7ff3485a4da5b3a0f1b0cee907b8111_HT_SAVE_INITIATED') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSavev1_38c2daa3ef364c829409d99c0f2ac44a_4c6f7ff3485a4da5b3a0f1b0cee907b8111_HT_SAVE_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_19624c2465db4dd99bc212776717eb03_d92ah8ds3k0g008t3x40_HT_SAVE_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_19624c2465db4dd99bc212776717eb03_d92ah8ds3k0g008t3x40_HT_SAVE_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_1b3bafacadfc4c639ee6d1e30500cfa9_d92ah8ds3k0g008t3x4g_true') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_1b3bafacadfc4c639ee6d1e30500cfa9_d92ah8ds3k0g008t3x4g_true(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_36e3aa9c0be84c1d9dbf46f64156e7da_d92ah8ds3k0g008t3x5g_DR_ACCT_DB_SUCEESS') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_36e3aa9c0be84c1d9dbf46f64156e7da_d92ah8ds3k0g008t3x5g_DR_ACCT_DB_SUCEESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_b3c1343c36ad4e98ac94ef4425f6bcbe_d92ah8ds3k0g008t3x60_NULL') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_b3c1343c36ad4e98ac94ef4425f6bcbe_d92ah8ds3k0g008t3x60_NULL(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_584237a6251e4db4bf5926bdaf8719f5_d92ah8ds3k0g008t3x6g_NOT_NULL') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_584237a6251e4db4bf5926bdaf8719f5_d92ah8ds3k0g008t3x6g_NOT_NULL(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_74aec8aad67849a18da414eab5a54f8d_d92ah8ds3k0g008t3x70_ACCT_BENE_API_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_74aec8aad67849a18da414eab5a54f8d_d92ah8ds3k0g008t3x70_ACCT_BENE_API_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_f7f74b5cbb054d93b20331d35c5eb6d4_d92ah8ds3k0g008t3x7g_CR_ACCT_DB_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_f7f74b5cbb054d93b20331d35c5eb6d4_d92ah8ds3k0g008t3x7g_CR_ACCT_DB_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_6cd571b738f445c393a546d0d3ebcd8a_d92ah8ds3k0g008t3x80_NO_RECORD') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_6cd571b738f445c393a546d0d3ebcd8a_d92ah8ds3k0g008t3x80_NO_RECORD(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSavev1_3d467aaad99d4c3b8435b71cae209a95_d7wvmm2yssc0008xkybg_false') 
        async CT005PFPFDGSSSMXmanualInitiationSavev1_3d467aaad99d4c3b8435b71cae209a95_d7wvmm2yssc0008xkybg_false(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}