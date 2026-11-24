import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmanualInitiationGetCustDetailsApiController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationGetCustDetailsApiv1_f4d0748435614adab93e37f2d2eed087_298fc2aaf9484e5296600d189e3a8f91111_Request_Initiation') 
        async CT005UFUFWGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationGetCustDetailsApiv1_f4d0748435614adab93e37f2d2eed087_298fc2aaf9484e5296600d189e3a8f91111_Request_Initiation(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationGetCustDetailsApiv1_f4d0748435614adab93e37f2d2eed087_0f7c89cb132c41649aa6599d7362c633111_Request_Initiation') 
        async CT005UFUFMGSSSMXpaymentInfov1CT005PFPFDGSSSMXmanualInitiationGetCustDetailsApiv1_f4d0748435614adab93e37f2d2eed087_0f7c89cb132c41649aa6599d7362c633111_Request_Initiation(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXmanualInitiationGetCustDetailsApiv1_e3cecb4c69b44a17aba77b8de56478fa_d7xd7rf2hjs0008avqyg_CGC_SUCCESS') 
        async CT005PFPFDGSSSMXmanualInitiationGetCustDetailsApiv1_e3cecb4c69b44a17aba77b8de56478fa_d7xd7rf2hjs0008avqyg_CGC_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}