import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addJobGradeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaddEmployeeJobGradev1CT006PFPFDECPHRMaddJobGradev1_a8c9d715fef02d88f21a83c5c5d9941c_9cc07606c6b0b17b7f38fc3e8465f754111_RequestInitiated') 
        async CT006UFUFWECPHRMaddEmployeeJobGradev1CT006PFPFDECPHRMaddJobGradev1_a8c9d715fef02d88f21a83c5c5d9941c_9cc07606c6b0b17b7f38fc3e8465f754111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobGradev1_7336ac7f9ffba8e9563a0d206ef3e6e5_2875e21993454f0ca6eb7402a9965e42_RequestCompleted') 
        async CT006PFPFDECPHRMaddJobGradev1_7336ac7f9ffba8e9563a0d206ef3e6e5_2875e21993454f0ca6eb7402a9965e42_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}