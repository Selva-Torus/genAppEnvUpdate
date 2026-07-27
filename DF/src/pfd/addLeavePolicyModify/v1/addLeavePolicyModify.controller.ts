import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addLeavePolicyModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewLeavePolicyv1CT006PFPFDECPHRMaddLeavePolicyModifyv1_38e455782e97f06fedea1f4209a217b6_289a399a405434e608e52415e8d83771111_RequestInitiated') 
        async CT006UFUFWECPHRMnewLeavePolicyv1CT006PFPFDECPHRMaddLeavePolicyModifyv1_38e455782e97f06fedea1f4209a217b6_289a399a405434e608e52415e8d83771111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMleavePolicyDeletev1CT006PFPFDECPHRMaddLeavePolicyModifyv1_38e455782e97f06fedea1f4209a217b6_a5a35c4ebe2b0d8804f1c78e0ba4bf3f111_RequestInitiated') 
        async CT006UFUFWECPHRMleavePolicyDeletev1CT006PFPFDECPHRMaddLeavePolicyModifyv1_38e455782e97f06fedea1f4209a217b6_a5a35c4ebe2b0d8804f1c78e0ba4bf3f111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeavePolicyModifyv1_51a58409c859f2f5f36f598305edf2ee_6516269e6be84795a6e60ed04775e901_RequestCompleted') 
        async CT006PFPFDECPHRMaddLeavePolicyModifyv1_51a58409c859f2f5f36f598305edf2ee_6516269e6be84795a6e60ed04775e901_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeavePolicyModifyv1_b0a7966f6280a3a54777f7026a31556b_b1bb2ea897bc4ddbb95d9b323c517b3b_Policy_Modified') 
        async CT006PFPFDECPHRMaddLeavePolicyModifyv1_b0a7966f6280a3a54777f7026a31556b_b1bb2ea897bc4ddbb95d9b323c517b3b_Policy_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeavePolicyModifyv1_089354a20cfb3029f0e6feee7ae107c6_5b437f3418a040238f93dc2f54ad3278_Policy_Deleted') 
        async CT006PFPFDECPHRMaddLeavePolicyModifyv1_089354a20cfb3029f0e6feee7ae107c6_5b437f3418a040238f93dc2f54ad3278_Policy_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}