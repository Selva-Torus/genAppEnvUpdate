import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmanualInitiationModifyExchangeRateController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_602a6db9240142ba8caa5f8403b86282113_MOD_AMT_RATE') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_602a6db9240142ba8caa5f8403b86282113_MOD_AMT_RATE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_51f934e7ff9a4d25896f126c2c4178b9111_HT_MOD_DR_AMOUNT') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_51f934e7ff9a4d25896f126c2c4178b9111_HT_MOD_DR_AMOUNT(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_47b2e2782fcf455fb3205769f4dbd2bf111_HT_MOD_CR_AMOUNT') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_47b2e2782fcf455fb3205769f4dbd2bf111_HT_MOD_CR_AMOUNT(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_c767e0003c614c3ebf6bdc0c503ce823111_HT_MOD_DR_AMOUNT') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_c767e0003c614c3ebf6bdc0c503ce823111_HT_MOD_DR_AMOUNT(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_8dcba27798ad4aed86a875127efff5df111_MOD_AMT_RATE') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_8dcba27798ad4aed86a875127efff5df111_MOD_AMT_RATE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_9f0928786943402d8c11634594280428111_HT_MOD_CR_AMOUNT') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_159d2f8719fa4a5795dbd806241c3d4f_9f0928786943402d8c11634594280428111_HT_MOD_CR_AMOUNT(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_b1d997c2a9ea42f2bfbcdd0f5a3f8262_d7y3rc12hjs0008avvtg_HT_MOD_AMT_RATE_INITIATED') 
        async CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_b1d997c2a9ea42f2bfbcdd0f5a3f8262_d7y3rc12hjs0008avvtg_HT_MOD_AMT_RATE_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_cd4d33e535a74d8888a58c382b84de29_d7y3rc12hjs0008avvv0_SAME_CURRENCY') 
        async CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_cd4d33e535a74d8888a58c382b84de29_d7y3rc12hjs0008avvv0_SAME_CURRENCY(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_123539a97f5b41ea86c2743bf98e313c_d7y3rc12hjs0008avvvg_DIFF_CURRENCY') 
        async CT005PFPFDGSSSMXmanualInitiationModifyExchangeRatev1_123539a97f5b41ea86c2743bf98e313c_d7y3rc12hjs0008avvvg_DIFF_CURRENCY(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}