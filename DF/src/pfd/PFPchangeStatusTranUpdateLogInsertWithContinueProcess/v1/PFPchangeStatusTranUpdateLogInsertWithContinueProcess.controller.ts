import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPchangeStatusTranUpdateLogInsertWithContinueProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_05a6287fe04349b39c853a442f4cb94c111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_05a6287fe04349b39c853a442f4cb94c111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_7c15d93a12e3448fa8142f1569033fe9111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_7c15d93a12e3448fa8142f1569033fe9111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_c5bbdaad8bb34f218347ed94f33e1fa7111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_c5bbdaad8bb34f218347ed94f33e1fa7111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_1acac664840e46be9151d95d4f9c932b111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_1acac664840e46be9151d95d4f9c932b111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXinboundReturnProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_c3164a7ccd634c3bb84fd521e09aa4d9111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXinboundReturnProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_c3164a7ccd634c3bb84fd521e09aa4d9111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_467eaa565d7138bd846fc4d877258219111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_467eaa565d7138bd846fc4d877258219111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_86f1a5d30343409d86817ebfc4cb3cbf111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_86f1a5d30343409d86817ebfc4cb3cbf111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXoutboundManualReturnProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_d4fd7e71bf18dcd3c31a96e4f1b9ff3e111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundManualReturnProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_d4fd7e71bf18dcd3c31a96e4f1b9ff3e111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXinboundApplySpecialRateProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_cf46652883a4f3e06b86bcf469ecfefb111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXinboundApplySpecialRateProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_cf46652883a4f3e06b86bcf469ecfefb111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtechInboundReturnProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_9a789ad0bcf368d319232844b6571c38111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtechInboundReturnProcessv1CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_314b970eed014fa1b6484a9822a9c300_9a789ad0bcf368d319232844b6571c38111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_df7a68d14eff4fc18cb8271fd6c7b45e_d8833jyw37yg0085wa2g_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_df7a68d14eff4fc18cb8271fd6c7b45e_d8833jyw37yg0085wa2g_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_4a6bbabdfb54414998932214f9775d56_625cdf1b1858410dadd32680a7cf5eeb_GET_LAST_LOG_API_SUCCESS') 
        async CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_4a6bbabdfb54414998932214f9775d56_625cdf1b1858410dadd32680a7cf5eeb_GET_LAST_LOG_API_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_db35082651eb42088777561ba0bb1b89_4e248f741ca74990ad9e73bd621773e6_VGPHTLM_API_INSERT_SUCCESS') 
        async CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_db35082651eb42088777561ba0bb1b89_4e248f741ca74990ad9e73bd621773e6_VGPHTLM_API_INSERT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_3f3baef2cadf4f73aac6bf9aa2e834bd_d8614mt2mrtg0081wby0_VGPHSTM_API_UPDATE_SUCCESS') 
        async CT005PFPFDGSSSMXchangeStatusTranUpdateLogInsertWithContinueProcessv1_3f3baef2cadf4f73aac6bf9aa2e834bd_d8614mt2mrtg0081wby0_VGPHSTM_API_UPDATE_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}