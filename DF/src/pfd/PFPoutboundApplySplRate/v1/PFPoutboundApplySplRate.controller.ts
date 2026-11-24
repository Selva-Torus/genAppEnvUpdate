import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPoutboundApplySplRateController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXoutboundApplySplRatev1_923e9ab04b7743a48436daab15c6d1e4_6f5117e27d159aa2cfa1b6c3db118eff111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundApplySpecialRatev1CT005PFPFDGSSSMXoutboundApplySplRatev1_923e9ab04b7743a48436daab15c6d1e4_6f5117e27d159aa2cfa1b6c3db118eff111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundApplySplRatev1_169427b7fc024388ac045405b202cb03_d8eres3t3pd0008mfwn0_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXoutboundApplySplRatev1_169427b7fc024388ac045405b202cb03_d8eres3t3pd0008mfwn0_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundApplySplRatev1_256efff01bdd4ba09068668d5f594ced_d8eres3t3pd0008mfwng_DR') 
        async CT005PFPFDGSSSMXoutboundApplySplRatev1_256efff01bdd4ba09068668d5f594ced_d8eres3t3pd0008mfwng_DR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundApplySplRatev1_9d11c1bdda5c4746b475adf18b98eb0f_d8eres3t3pd0008mfwp0_CR') 
        async CT005PFPFDGSSSMXoutboundApplySplRatev1_9d11c1bdda5c4746b475adf18b98eb0f_d8eres3t3pd0008mfwp0_CR(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}