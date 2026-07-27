import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addBackgroundCheckController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewBackgroundCheckv1CT006PFPFDECPHRMaddBackgroundCheckv1_5f8132d822bc8cd58cdd9d9235c6b8e7_2b0919dd96bfb460f6bde5fce72dd5e0111_RequestInitiated') 
        async CT006UFUFWECPHRMnewBackgroundCheckv1CT006PFPFDECPHRMaddBackgroundCheckv1_5f8132d822bc8cd58cdd9d9235c6b8e7_2b0919dd96bfb460f6bde5fce72dd5e0111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddBackgroundCheckv1_cfeb08e224c2534ca25babc13c9c5157_d9gy6t38rws0008cjh9g_post_check_initiated') 
        async CT006PFPFDECPHRMaddBackgroundCheckv1_cfeb08e224c2534ca25babc13c9c5157_d9gy6t38rws0008cjh9g_post_check_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}