import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPoutboundRetunExchangeRateBindProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXoutboundManualReturnProcessv1CT005PFPFDGSSSMXoutboundRetunExchangeRateBindProcessv1_d9b043ee0848494ba7548aa0306ac7c6_d63f7eb2b2c357905ea76d9eb8771ca9111_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXoutboundManualReturnProcessv1CT005PFPFDGSSSMXoutboundRetunExchangeRateBindProcessv1_d9b043ee0848494ba7548aa0306ac7c6_d63f7eb2b2c357905ea76d9eb8771ca9111_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundRetunExchangeRateBindProcessv1_6f0fdf3bebd54c28aed35895c9bcd36b_e329dbc5dc9f41c8a9d272385c24e252_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXoutboundRetunExchangeRateBindProcessv1_6f0fdf3bebd54c28aed35895c9bcd36b_e329dbc5dc9f41c8a9d272385c24e252_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}