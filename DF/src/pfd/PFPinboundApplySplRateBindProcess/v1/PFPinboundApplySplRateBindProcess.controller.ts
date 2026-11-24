import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPinboundApplySplRateBindProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_78b10ea216edbba279f7ead41f9f96f3_806f01dbb2c74ccbb68e2a857e9a62ff112_HT_RB_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_78b10ea216edbba279f7ead41f9f96f3_806f01dbb2c74ccbb68e2a857e9a62ff112_HT_RB_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_78b10ea216edbba279f7ead41f9f96f3_1b1d584d01574dd7ae3a5fc8007ca082115_HT_RB_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_78b10ea216edbba279f7ead41f9f96f3_1b1d584d01574dd7ae3a5fc8007ca082115_HT_RB_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_0677e5f567528fbd43014b785f765888_99dd094618034f17a424f61286c7cac9_HT_RB_SUCCESS') 
        async CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_0677e5f567528fbd43014b785f765888_99dd094618034f17a424f61286c7cac9_HT_RB_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_5f5d28306f59875f7d28390454f5bb71_673f7824941442daab8ef6cc3095d68a_DB_RB_SUCCESS') 
        async CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_5f5d28306f59875f7d28390454f5bb71_673f7824941442daab8ef6cc3095d68a_DB_RB_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_4d1d4361d11040492847f2b3c2140e2c_7cf8df62b7144e8d82bbb6d5e278b78d_Maker') 
        async CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_4d1d4361d11040492847f2b3c2140e2c_7cf8df62b7144e8d82bbb6d5e278b78d_Maker(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_fea5d3531c40f8272307d3c44bca0df9_cbee550920d143d3b882b7055ce384e3_Checker') 
        async CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_fea5d3531c40f8272307d3c44bca0df9_cbee550920d143d3b882b7055ce384e3_Checker(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_fa32ef52b73103578d66fda3cb57ca44_240d32b136e64e72bca9fba68994741c_SR_SUCCESS') 
        async CT005PFPFDGSSSMXinboundApplySplRateBindProcessv1_fa32ef52b73103578d66fda3cb57ca44_240d32b136e64e72bca9fba68994741c_SR_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}