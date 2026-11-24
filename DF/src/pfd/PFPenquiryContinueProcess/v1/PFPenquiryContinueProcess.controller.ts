import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPenquiryContinueProcessController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXEnquiryv1CT005PFPFDGSSSMXenquiryContinueProcessv1_2928ce77e1374cceab1c5a08bd3bfe67_8d7703ca6ad64ccab0b69f69098fcaa9111_HT_SOURCE') 
        async CT005UFUFWGSSSMXEnquiryv1CT005PFPFDGSSSMXenquiryContinueProcessv1_2928ce77e1374cceab1c5a08bd3bfe67_8d7703ca6ad64ccab0b69f69098fcaa9111_HT_SOURCE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXenquiryContinueProcessv1_96b0f0c46b49442483762ea9e1b1c1e7_d9fnyes8rws0008cabmg_HT_SUCCESS') 
        async CT005PFPFDGSSSMXenquiryContinueProcessv1_96b0f0c46b49442483762ea9e1b1c1e7_d9fnyes8rws0008cabmg_HT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXenquiryContinueProcessv1_6f2c8da58fa443138bed47a23daf9630_d9fmrb18rws0008c9z6g_log_insert_initiated') 
        async CT005PFPFDGSSSMXenquiryContinueProcessv1_6f2c8da58fa443138bed47a23daf9630_d9fmrb18rws0008c9z6g_log_insert_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXenquiryContinueProcessv1_dee903c2eb93423899d05aa6425e1576_d9fmrb18rws0008c9z70_continue_process_initiated') 
        async CT005PFPFDGSSSMXenquiryContinueProcessv1_dee903c2eb93423899d05aa6425e1576_d9fmrb18rws0008c9z70_continue_process_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}