import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPoutboundReturnBindProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXoutboundReturnBindProcessv1_19392e06be214dc4bbdb4de485f6664f_389201b1c002401e9363e0d0902311fd114_HT_RB_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXoutboundReturnBindProcessv1_19392e06be214dc4bbdb4de485f6664f_389201b1c002401e9363e0d0902311fd114_HT_RB_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXoutboundReturnBindProcessv1_19392e06be214dc4bbdb4de485f6664f_4e72b75cf6f54c2993f79b3d7d0e3f5b112_HT_CT_INITIATED') 
        async CT005UFUFWGSSSMXtransactionProductv1CT005PFPFDGSSSMXoutboundReturnBindProcessv1_19392e06be214dc4bbdb4de485f6664f_4e72b75cf6f54c2993f79b3d7d0e3f5b112_HT_CT_INITIATED(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundReturnBindProcessv1_6ad17d68b8b74a16831462ee736a90e5_d8rk9heh19pg008djvm0_HT_RB_SUCCESS') 
        async CT005PFPFDGSSSMXoutboundReturnBindProcessv1_6ad17d68b8b74a16831462ee736a90e5_d8rk9heh19pg008djvm0_HT_RB_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundReturnBindProcessv1_794097fc822f47a8bfc7994fe137a91f_d8rmcash19pg008dk3b0_DB_RB_SUCCESS') 
        async CT005PFPFDGSSSMXoutboundReturnBindProcessv1_794097fc822f47a8bfc7994fe137a91f_d8rmcash19pg008dk3b0_DB_RB_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundReturnBindProcessv1_53f76efbe258417190f1460e9de9ae56_d8rmcash19pg008dk3bg_Maker') 
        async CT005PFPFDGSSSMXoutboundReturnBindProcessv1_53f76efbe258417190f1460e9de9ae56_d8rmcash19pg008dk3bg_Maker(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundReturnBindProcessv1_3cb0780df11f4bf39e9fd07fcdf0fd7b_d8rmcash19pg008dk3c0_Checker') 
        async CT005PFPFDGSSSMXoutboundReturnBindProcessv1_3cb0780df11f4bf39e9fd07fcdf0fd7b_d8rmcash19pg008dk3c0_Checker(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundReturnBindProcessv1_63c25cc342304104b2126782c3bb86b3_d8rmcash19pg008dk3cg_SR_SUCCESS') 
        async CT005PFPFDGSSSMXoutboundReturnBindProcessv1_63c25cc342304104b2126782c3bb86b3_d8rmcash19pg008dk3cg_SR_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXoutboundReturnBindProcessv1_6bd442178d614a72861ac2690c89f4d9_d8s3wyvh19pg008dkmj0_DBR_SUCCESS') 
        async CT005PFPFDGSSSMXoutboundReturnBindProcessv1_6bd442178d614a72861ac2690c89f4d9_d8s3wyvh19pg008dkmj0_DBR_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}