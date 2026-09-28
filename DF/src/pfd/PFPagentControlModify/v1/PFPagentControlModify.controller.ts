import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPagentControlModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAgentControlv1CT003PFPFDTAGTAGagentControlModifyv1_5ed0bfbe823dc17ca040921d1d9ee7be_912f18d2bd9cc2e003175c4a5e7b6a02111_RequestInitaition') 
        async CT003UFUFWTAGTAGaddAgentControlv1CT003PFPFDTAGTAGagentControlModifyv1_5ed0bfbe823dc17ca040921d1d9ee7be_912f18d2bd9cc2e003175c4a5e7b6a02111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGagentDeletev1CT003PFPFDTAGTAGagentControlModifyv1_5ed0bfbe823dc17ca040921d1d9ee7be_b4125a4d1eb13e7ba63cbbee0572a546111_RequestInitaition') 
        async CT003UFUFWTAGTAGagentDeletev1CT003PFPFDTAGTAGagentControlModifyv1_5ed0bfbe823dc17ca040921d1d9ee7be_b4125a4d1eb13e7ba63cbbee0572a546111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGagentControlModifyv1_fd2074da9edbe5f65a7caf074622b787_4e2be70b75da4605aeb698f7adbf6114_RequestCompleted') 
        async CT003PFPFDTAGTAGagentControlModifyv1_fd2074da9edbe5f65a7caf074622b787_4e2be70b75da4605aeb698f7adbf6114_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGagentControlModifyv1_4d096d7b1d52ecdce3f1f582a68ce475_0eadbf8cafdc49e797e123b70f314634_Control_Modified') 
        async CT003PFPFDTAGTAGagentControlModifyv1_4d096d7b1d52ecdce3f1f582a68ce475_0eadbf8cafdc49e797e123b70f314634_Control_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGagentControlModifyv1_2bcdf7f14d8bb4df154fe3be37a9875a_4dd8774b8b7e487b9346b7e1b97f6019_Control_Deleted') 
        async CT003PFPFDTAGTAGagentControlModifyv1_2bcdf7f14d8bb4df154fe3be37a9875a_4dd8774b8b7e487b9346b7e1b97f6019_Control_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}