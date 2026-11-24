import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPinboundApplySplRateExchangeRateBindProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXinboundApplySpecialRateProcessv1CT005PFPFDGSSSMXinboundApplySplRateExchangeRateBindProcessv1_b6a7a6002e0c8f6ec70831553993e7d1_f65d03364b852f0853644020a41db974111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXinboundApplySpecialRateProcessv1CT005PFPFDGSSSMXinboundApplySplRateExchangeRateBindProcessv1_b6a7a6002e0c8f6ec70831553993e7d1_f65d03364b852f0853644020a41db974111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundApplySplRateExchangeRateBindProcessv1_1643477e9c7b5496b29885d0b563a274_d8td0fsrvxrg008vrzyg_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXinboundApplySplRateExchangeRateBindProcessv1_1643477e9c7b5496b29885d0b563a274_d8td0fsrvxrg008vrzyg_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}