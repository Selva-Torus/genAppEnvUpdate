import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmanualInitiationChargeCalulationApiController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_f0384673c93447a4929d8d343cd3e09e_d9bbb8260fd44758b7881b66c3e63052111_HT_CHARGE_TYPE') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_f0384673c93447a4929d8d343cd3e09e_d9bbb8260fd44758b7881b66c3e63052111_HT_CHARGE_TYPE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_f0384673c93447a4929d8d343cd3e09e_6e30686b9d8a4d8895006edb5483ed52111_HT_CHARGE_TYPE') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_f0384673c93447a4929d8d343cd3e09e_6e30686b9d8a4d8895006edb5483ed52111_HT_CHARGE_TYPE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_b448c12779f9460dbbb769d2b4f5499e_d7xeszz2hjs0008avrc0_HT_CHARGE_TYPE_INITIATED') 
        async CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_b448c12779f9460dbbb769d2b4f5499e_d7xeszz2hjs0008avrc0_HT_CHARGE_TYPE_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_c0a51125e5694845b4d142e846e950e9_d7xeszz2hjs0008avrcg_OUR') 
        async CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_c0a51125e5694845b4d142e846e950e9_d7xeszz2hjs0008avrcg_OUR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_c9af4d4cb6584ce9b2ca2e547714b775_d7xeszz2hjs0008avrd0_BEN_OR_SHA') 
        async CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_c9af4d4cb6584ce9b2ca2e547714b775_d7xeszz2hjs0008avrd0_BEN_OR_SHA(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_04fb04c46b7648dc9d339742a3ed09f4_d7xeszz2hjs0008avrdg_API_BEN_OR_SHA_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_04fb04c46b7648dc9d339742a3ed09f4_d7xeszz2hjs0008avrdg_API_BEN_OR_SHA_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_23a7645a87064aecbe1590cf64ae5205_d7xeszz2hjs0008avreg_BEN_NON_KES') 
        async CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_23a7645a87064aecbe1590cf64ae5205_d7xeszz2hjs0008avreg_BEN_NON_KES(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_ae10e5a103cf495daa396475579e948b_d7xev6c2hjs0008avrxg_OTHER') 
        async CT005PFPFDGSSSMXmanualInitiationChargeCalulationApiv1_ae10e5a103cf495daa396475579e948b_d7xev6c2hjs0008avrxg_OTHER(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}