import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class newLeavePolicyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewLeavePolicyv1CT006PFPFDECPHRMnewLeavePolicyv1_af9806fd59ff953bc4b7e758c863d617_1dffe24893169e6ed89731404875c873111_RequestInitiated') 
        async CT006UFUFWECPHRMnewLeavePolicyv1CT006PFPFDECPHRMnewLeavePolicyv1_af9806fd59ff953bc4b7e758c863d617_1dffe24893169e6ed89731404875c873111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMnewLeavePolicyv1_bb6dc2a6824b26135223a92de3eea29e_9f69d85da8b840f38685b6904a0f0956_RequestCompleted') 
        async CT006PFPFDECPHRMnewLeavePolicyv1_bb6dc2a6824b26135223a92de3eea29e_9f69d85da8b840f38685b6904a0f0956_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}