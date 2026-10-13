import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPwpsFileProcessRetryAlreadyPostedController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSWPSwpsv1CT005PFPFDGSSWPSwpsFileProcessRetryAlreadyPostedv1_6210808539b7462d9737b7217e5ae792_a29f31638a494bee89b9d7a8ac0b08fa111_retryAlready1') 
        async CT005UFUFWGSSWPSwpsv1CT005PFPFDGSSWPSwpsFileProcessRetryAlreadyPostedv1_6210808539b7462d9737b7217e5ae792_a29f31638a494bee89b9d7a8ac0b08fa111_retryAlready1(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSWPSwpsv1CT005PFPFDGSSWPSwpsFileProcessRetryAlreadyPostedv1_6210808539b7462d9737b7217e5ae792_3cac4bc254d64a0c93dd2a294770734c111_AlrPosSucc1') 
        async CT005UFUFWGSSWPSwpsv1CT005PFPFDGSSWPSwpsFileProcessRetryAlreadyPostedv1_6210808539b7462d9737b7217e5ae792_3cac4bc254d64a0c93dd2a294770734c111_AlrPosSucc1(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSWPSwpsFileProcessRetryAlreadyPostedv1_b89a87b794704d83828e42c412665391_d9t24tka71y0008xb5x0_retrySucc') 
        async CT005PFPFDGSSWPSwpsFileProcessRetryAlreadyPostedv1_b89a87b794704d83828e42c412665391_d9t24tka71y0008xb5x0_retrySucc(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}