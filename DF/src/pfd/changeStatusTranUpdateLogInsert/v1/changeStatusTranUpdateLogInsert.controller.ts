import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class changeStatusTranUpdateLogInsertController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT005UFUFWGSSRTGSscanSaveProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_6b31c6b63ab740dd95c469e837005fe8112_HT_CT_INTIATE') 
        async CT005UFUFWGSSRTGSscanSaveProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_6b31c6b63ab740dd95c469e837005fe8112_HT_CT_INTIATE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSRTGStransactionProductv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_6ed1f0b74cf24e90856e6bc6c81770f9111_HT_CT_INTIATE') 
        async CT005UFUFWGSSRTGStransactionProductv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_6ed1f0b74cf24e90856e6bc6c81770f9111_HT_CT_INTIATE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSRTGSreturnReasonPopUpUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_852df16deea848d183d13a86633be5ab111_HT_CT_SOURCE') 
        async CT005UFUFWGSSRTGSreturnReasonPopUpUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_852df16deea848d183d13a86633be5ab111_HT_CT_SOURCE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSRTGSinboundScanProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_3c826210da8644bfaa0c40da1912a0bf111_changestatusprocess_initiated') 
        async CT005UFUFWGSSRTGSinboundScanProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_3c826210da8644bfaa0c40da1912a0bf111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSRTGSinboundScanProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_ce90d09ca0dd491b82c760b9c1293cf0111_changestatusprocess_initiated') 
        async CT005UFUFWGSSRTGSinboundScanProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_ce90d09ca0dd491b82c760b9c1293cf0111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSRTGSinboundScanProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_58e523e35f3f4a4b810d4b3c48a12b6e112_changestatusprocess_initiated') 
        async CT005UFUFWGSSRTGSinboundScanProcessUiv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_58e523e35f3f4a4b810d4b3c48a12b6e112_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSRTGStransactionProductv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_09f2e1426cd74615aac87a0179f0765b111_retry_intiated') 
        async CT005UFUFWGSSRTGStransactionProductv1CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_09f2e1426cd74615aac87a0179f0765b111_retry_intiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_4a6bbabdfb54414998932214f9775d56_d80ve9scd0tg008dg33g_HT_CT_SUCCESS') 
        async CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_4a6bbabdfb54414998932214f9775d56_d80ve9scd0tg008dg33g_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_db35082651eb42088777561ba0bb1b89_d80ve9scd0tg008dg340_VGPHTLM_API_INSERT_SUCCESS') 
        async CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_db35082651eb42088777561ba0bb1b89_d80ve9scd0tg008dg340_VGPHTLM_API_INSERT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_1bf79612038d46d1b6dd2065b914ccc0_d95tent4bjhg008jdwf0_VGPHSTM_API_UPDATE_SUCCESS') 
        async CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_1bf79612038d46d1b6dd2065b914ccc0_d95tent4bjhg008jdwf0_VGPHSTM_API_UPDATE_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_fb513bc3ed4f4df7be3e7563cb44cdaa_d9fg0es8rws0008c7zvg_continue_proc_succs') 
        async CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_fb513bc3ed4f4df7be3e7563cb44cdaa_d9fg0es8rws0008c7zvg_continue_proc_succs(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_7c3d1c12120e40cebf76e8b544bff203_d9fg0es8rws0008c7zwg_save') 
        async CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_7c3d1c12120e40cebf76e8b544bff203_d9fg0es8rws0008c7zwg_save(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_399f019aaf0f48c0889a4788a6ab2e67_d9fg0es8rws0008c7zx0_procedureexecutionnode_initiated') 
        async CT005PFPFDGSSRTGSchangeStatusTranUpdateLogInsertv1_399f019aaf0f48c0889a4788a6ab2e67_d9fg0es8rws0008c7zx0_procedureexecutionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}