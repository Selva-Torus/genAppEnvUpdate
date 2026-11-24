import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPnfchangeStatusTranUpdateLogInsertWithContinueProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXnfCancelRequestCamt055v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_ad160f693c5344b1a09e8539ccf77a80_7e12f87e4b08eb6040f938fec34510fd111_changestatusprocess_initiated') 
        async CT005UFUFWGSSSMXnfCancelRequestCamt055v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_ad160f693c5344b1a09e8539ccf77a80_7e12f87e4b08eb6040f938fec34510fd111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfInvestigationRequestCamt110v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_ad160f693c5344b1a09e8539ccf77a80_25f229e4e2f4d63b908c95fcaed727ff111_changestatusprocess_initiated') 
        async CT005UFUFWGSSSMXnfInvestigationRequestCamt110v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_ad160f693c5344b1a09e8539ccf77a80_25f229e4e2f4d63b908c95fcaed727ff111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXnfInvestigationResponseCamt111v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_ad160f693c5344b1a09e8539ccf77a80_d4bf788f24bb95a88805f7d6bfa0d9a3111_changestatusprocess_initiated') 
        async CT005UFUFWGSSSMXnfInvestigationResponseCamt111v1CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_ad160f693c5344b1a09e8539ccf77a80_d4bf788f24bb95a88805f7d6bfa0d9a3111_changestatusprocess_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_a68e55c2b1474ea4bcba2b238c7f1a9e_d95ntvv4bjhg008jczpg_get_last_log_initiated') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_a68e55c2b1474ea4bcba2b238c7f1a9e_d95ntvv4bjhg008jczpg_get_last_log_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_d4c643d23fa648818a92bca3fdcd2fe7_d8ybbj6wp83g008fsjh0_log_insert_initiated') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_d4c643d23fa648818a92bca3fdcd2fe7_d8ybbj6wp83g008fsjh0_log_insert_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_2c26a89ea093457c87e72933879b2024_d8yj5z7zv5tg0089q7p0_log_insert_success') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_2c26a89ea093457c87e72933879b2024_d8yj5z7zv5tg0089q7p0_log_insert_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_675ab009ad51417f8c4eef0d3aef29e9_d8ybbj6wp83g008fsjhg_nf_tran_update_success') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_675ab009ad51417f8c4eef0d3aef29e9_d8ybbj6wp83g008fsjhg_nf_tran_update_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_bd506a19062e418191bd88dfeffc3c1e_d8ybbj6wp83g008fsjj0_tran_update_success') 
        async CT005PFPFDGSSSMXnfchangeStatusTranUpdateLogInsertWithContinueProcessv1_bd506a19062e418191bd88dfeffc3c1e_d8ybbj6wp83g008fsjj0_tran_update_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}