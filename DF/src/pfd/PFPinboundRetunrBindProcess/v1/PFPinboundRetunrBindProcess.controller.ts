import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPinboundRetunrBindProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_09d0c6b221ce49a0a544e8bcf84b8342114_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_09d0c6b221ce49a0a544e8bcf84b8342114_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_af3b6739741647c6a57827320fe592a5113_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_af3b6739741647c6a57827320fe592a5113_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_884810e7909148df98f0e25937252343119_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_884810e7909148df98f0e25937252343119_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_27a96ee1ecb94d0e85ff0775ecc54b4c113_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_27a96ee1ecb94d0e85ff0775ecc54b4c113_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_21142dbc15dd4292834fcc8b760b715b114_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXinboundRetunrBindProcessv1_b35a50f413a94bc9a10e034d85e577f0_21142dbc15dd4292834fcc8b760b715b114_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXinboundRetunrBindProcessv1_1b4b260ff65d4ea5947e0cd1f9cfa696_d8n6gk2gkp80008jdp2g_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXinboundRetunrBindProcessv1_1b4b260ff65d4ea5947e0cd1f9cfa696_d8n6gk2gkp80008jdp2g_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}