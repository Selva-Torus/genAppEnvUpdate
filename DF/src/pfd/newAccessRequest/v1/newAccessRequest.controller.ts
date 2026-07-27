import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class newAccessRequestController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewAccessRequestv1CT006PFPFDECPHRMnewAccessRequestv1_df4fd23f80574a0d9ec4fb6fbd383638_35a812d848224213a71ccebd87464168111_RequestInitiated') 
        async CT006UFUFWECPHRMnewAccessRequestv1CT006PFPFDECPHRMnewAccessRequestv1_df4fd23f80574a0d9ec4fb6fbd383638_35a812d848224213a71ccebd87464168111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMnewAccessRequestv1_fd2e8c60b6fd4521b80af4791cad7709_d8k4ptkpvx0g008vbmv0_RequestCompleted') 
        async CT006PFPFDECPHRMnewAccessRequestv1_fd2e8c60b6fd4521b80af4791cad7709_d8k4ptkpvx0g008vbmv0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}