import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPnfBindTranProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXnfTransactionProductv1CT005PFPFDGSSSMXnfBindTranProcessv1_b1c1b38340eb42f39f5769f6d4151d4b_57b0757791650767e8a6834b54a2902f113_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXnfTransactionProductv1CT005PFPFDGSSSMXnfBindTranProcessv1_b1c1b38340eb42f39f5769f6d4151d4b_57b0757791650767e8a6834b54a2902f113_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfTransactionProductv1CT005PFPFDGSSSMXnfBindTranProcessv1_b1c1b38340eb42f39f5769f6d4151d4b_7c0e001f7e1822cb3e8173e119f3da3f113_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXnfTransactionProductv1CT005PFPFDGSSSMXnfBindTranProcessv1_b1c1b38340eb42f39f5769f6d4151d4b_7c0e001f7e1822cb3e8173e119f3da3f113_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfTransactionProductv1CT005PFPFDGSSSMXnfBindTranProcessv1_b1c1b38340eb42f39f5769f6d4151d4b_9e44591f397e4d228890f43636547e33113_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXnfTransactionProductv1CT005PFPFDGSSSMXnfBindTranProcessv1_b1c1b38340eb42f39f5769f6d4151d4b_9e44591f397e4d228890f43636547e33113_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfBindTranProcessv1_d525166b019a44dabf15efc1ff11d0c7_d92zzdxekc90008jsjqg_HT_CT_SUCCESS') 
        async CT005PFPFDGSSSMXnfBindTranProcessv1_d525166b019a44dabf15efc1ff11d0c7_d92zzdxekc90008jsjqg_HT_CT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}