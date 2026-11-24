import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPnfchangeStatusTranUpdateLogInsertController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXnfCancelRequestCamt055v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_d98e00eeeefa4d28abfda3d4ae181686_0e83b0943e56ca3f5469ac48f5e88d84111_changestatusprocess_initiated') 
        async CT005UFUFWGSSSMXnfCancelRequestCamt055v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_d98e00eeeefa4d28abfda3d4ae181686_0e83b0943e56ca3f5469ac48f5e88d84111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfInvestigationRequestCamt110v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_d98e00eeeefa4d28abfda3d4ae181686_08d113a4c5954e4ad472a6fea725b353111_changestatusprocess_initiated') 
        async CT005UFUFWGSSSMXnfInvestigationRequestCamt110v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_d98e00eeeefa4d28abfda3d4ae181686_08d113a4c5954e4ad472a6fea725b353111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfInvestigationResponseCamt111v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_d98e00eeeefa4d28abfda3d4ae181686_f52432b4c5b58c02ecc6afd1133651be111_changestatusprocess_initiated') 
        async CT005UFUFWGSSSMXnfInvestigationResponseCamt111v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_d98e00eeeefa4d28abfda3d4ae181686_f52432b4c5b58c02ecc6afd1133651be111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_553d4c32cbff490b8d5c87b34e8c0039_d932e600zzyg0087t89g_get_last_log_initiated') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_553d4c32cbff490b8d5c87b34e8c0039_d932e600zzyg0087t89g_get_last_log_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_99a55999582945ab8aa74a7c1016159f_d8xx028wp83g008frctg_log_insert_initiated') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_99a55999582945ab8aa74a7c1016159f_d8xx028wp83g008frctg_log_insert_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_1a1fc52feaf04f598454a992a2e509e1_d8yjafhzv5tg0089qa3g_nf_tran_update_initiated') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_1a1fc52feaf04f598454a992a2e509e1_d8yjafhzv5tg0089qa3g_nf_tran_update_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_625967c238824387a908b57e7c47b83f_d8xx028wp83g008frcv0_tran_update_initiated') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertv1_625967c238824387a908b57e7c47b83f_d8xx028wp83g008frcv0_tran_update_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}