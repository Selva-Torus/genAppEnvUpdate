import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmanualInitiationSplFXRateApiController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_1ef993ff93ea4acc89385ddcd6d9db04_ac2b2cd3456e451ea9ec7bc05a7b2ebe111_EXG_RATE_HT_INITIATED') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_1ef993ff93ea4acc89385ddcd6d9db04_ac2b2cd3456e451ea9ec7bc05a7b2ebe111_EXG_RATE_HT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_1ef993ff93ea4acc89385ddcd6d9db04_fb406724edae4ed58889f2f22dcfe7e0111_EXG_RATE_HT_INITIATED') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_1ef993ff93ea4acc89385ddcd6d9db04_fb406724edae4ed58889f2f22dcfe7e0111_EXG_RATE_HT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_b8377149b2f24ed9ae06c147b0ca17da_d7y3m482hjs0008avv7g_EXG_RATE_HT_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_b8377149b2f24ed9ae06c147b0ca17da_d7y3m482hjs0008avv7g_EXG_RATE_HT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_14e1162d822c4a8da548bbbf3d53185e_d7y3m482hjs0008avv80_CR') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_14e1162d822c4a8da548bbbf3d53185e_d7y3m482hjs0008avv80_CR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_ea99a8e5702d4723a50e7fd2d77817bb_d7y3m482hjs0008avv8g_DR') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_ea99a8e5702d4723a50e7fd2d77817bb_d7y3m482hjs0008avv8g_DR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_00b8daf1494e493890720dea6c95ca07_d7y3m482hjs0008avv90_CR_DIFF_CUR') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_00b8daf1494e493890720dea6c95ca07_d7y3m482hjs0008avv90_CR_DIFF_CUR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_b2c2890f75464aa8b0cd3246fa43905e_d7y3m482hjs0008avv9g_CR_SAME_CUR') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_b2c2890f75464aa8b0cd3246fa43905e_d7y3m482hjs0008avv9g_CR_SAME_CUR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_e97191b260d34937aeba50c5a812955b_d7y3m482hjs0008avva0_DR_SAME_CUR') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_e97191b260d34937aeba50c5a812955b_d7y3m482hjs0008avva0_DR_SAME_CUR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_d3cc9eb21f32484299ab78485416e947_d7y3m482hjs0008avvag_DR_DIFF_CUR') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_d3cc9eb21f32484299ab78485416e947_d7y3m482hjs0008avvag_DR_DIFF_CUR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_3bb52fe3440c4c22aef1699a64d5bdfd_d7y3m482hjs0008avvb0_CR_MSR_API_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_3bb52fe3440c4c22aef1699a64d5bdfd_d7y3m482hjs0008avvb0_CR_MSR_API_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_10f7c55e48344e0f9c8b2111644f225e_d7y3m482hjs0008avvbg_DR_MSR_API_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_10f7c55e48344e0f9c8b2111644f225e_d7y3m482hjs0008avvbg_DR_MSR_API_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_2ccb03ffd88843108ada9b52be5126f6_d7y3m482hjs0008avvc0_CR_SPL_RATE_FAILED') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_2ccb03ffd88843108ada9b52be5126f6_d7y3m482hjs0008avvc0_CR_SPL_RATE_FAILED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_da94c06162124d1cbb8e9868eb2a64d9_d7y3m482hjs0008avvcg_DR_SPL_RATE_FAILED') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_da94c06162124d1cbb8e9868eb2a64d9_d7y3m482hjs0008avvcg_DR_SPL_RATE_FAILED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_276ab3c1404247ac86c7e7b74a570f02_d7y3m482hjs0008avvd0_CR_FXDBREQ_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_276ab3c1404247ac86c7e7b74a570f02_d7y3m482hjs0008avvd0_CR_FXDBREQ_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_eb6265afa2984ccdb2b6eb7230cdcf97_d7y3m482hjs0008avvdg_DR_FXDBREQ_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_eb6265afa2984ccdb2b6eb7230cdcf97_d7y3m482hjs0008avvdg_DR_FXDBREQ_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_e5b9c33f082144cf9190038caef56bfb_d7y3m482hjs0008avve0_CR_SPL_RATE_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_e5b9c33f082144cf9190038caef56bfb_d7y3m482hjs0008avve0_CR_SPL_RATE_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_7516fab2f10e4e7ab07b2f10b541d295_d7y3m482hjs0008avveg_DR_SPL_RATE_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationSplFXRateApiv1_7516fab2f10e4e7ab07b2f10b541d295_d7y3m482hjs0008avveg_DR_SPL_RATE_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}