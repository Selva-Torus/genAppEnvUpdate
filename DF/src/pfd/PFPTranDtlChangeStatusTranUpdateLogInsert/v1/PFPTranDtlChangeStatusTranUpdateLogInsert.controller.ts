import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPTranDtlChangeStatusTranUpdateLogInsertController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXinboundReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_b758e3610ed74ae7a0bc676f15703b4e111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXinboundReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_b758e3610ed74ae7a0bc676f15703b4e111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_b758e3610ed74ae7a0bc676f15703b4e111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_b758e3610ed74ae7a0bc676f15703b4e111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_fae71f2c9372bb85999b4d4a8febdf41111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_fae71f2c9372bb85999b4d4a8febdf41111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXoutboundReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_645be9289522e1c697af2253282c7e8c111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_645be9289522e1c697af2253282c7e8c111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXoutboundManualReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_d50bd809c130bb536f4991f7f53c7f8c111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundManualReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_d50bd809c130bb536f4991f7f53c7f8c111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXinboundApplySpecialRateProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_64178a518021a9b14fef21c238c4fcee111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXinboundApplySpecialRateProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_64178a518021a9b14fef21c238c4fcee111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtechInboundReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_a228d3b2a20a9f6205c28dcb3a9a3f06111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtechInboundReturnProcessv1CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_314b970eed014fa1b6484a9822a9c300_a228d3b2a20a9f6205c28dcb3a9a3f06111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_ce8d9aecf2f94ca3b11f2520f4e90fce_d8bx8dswjs7g008c124g_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_ce8d9aecf2f94ca3b11f2520f4e90fce_d8bx8dswjs7g008c124g_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_c0c66324f2dd47e39ebd6752d5ce98d0_80324b2bdb224ca0aca6d80fd5cb734f_VGPHTDM_API_INSERT_SUCCESS') 
        async CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_c0c66324f2dd47e39ebd6752d5ce98d0_80324b2bdb224ca0aca6d80fd5cb734f_VGPHTDM_API_INSERT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_4a6bbabdfb54414998932214f9775d56_b485b636bd7a4167abb7ed1d2a7a8322_DTL_API_INSERT_SUCCESS') 
        async CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_4a6bbabdfb54414998932214f9775d56_b485b636bd7a4167abb7ed1d2a7a8322_DTL_API_INSERT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_db35082651eb42088777561ba0bb1b89_8b04f0f3f2464059a311ad69952de97a_LOG_API_INSERT_SUCCESS') 
        async CT005PFPFDGSSSMXTranDtlChangeStatusTranUpdateLogInsertv1_db35082651eb42088777561ba0bb1b89_8b04f0f3f2464059a311ad69952de97a_LOG_API_INSERT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}