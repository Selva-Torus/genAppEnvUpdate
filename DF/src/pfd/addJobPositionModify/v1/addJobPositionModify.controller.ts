import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addJobPositionModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaddEmployeeJobPositionv1CT006PFPFDECPHRMaddJobPositionModifyv1_6126954e4ef5e548250b356962086bce_9ddb66f44cea14fcc4e7fb9e29794589111_RequestInitiated') 
        async CT006UFUFWECPHRMaddEmployeeJobPositionv1CT006PFPFDECPHRMaddJobPositionModifyv1_6126954e4ef5e548250b356962086bce_9ddb66f44cea14fcc4e7fb9e29794589111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMemployeeJobPositionDeletev1CT006PFPFDECPHRMaddJobPositionModifyv1_6126954e4ef5e548250b356962086bce_eaf9d88a579d22c678a208fd1bc1f631111_RequestInitiated') 
        async CT006UFUFWECPHRMemployeeJobPositionDeletev1CT006PFPFDECPHRMaddJobPositionModifyv1_6126954e4ef5e548250b356962086bce_eaf9d88a579d22c678a208fd1bc1f631111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobPositionModifyv1_1686ce5e2a0742a2c699d6442e33771a_d8qrq4wf1tdg008zhwn0_RequestCompleted') 
        async CT006PFPFDECPHRMaddJobPositionModifyv1_1686ce5e2a0742a2c699d6442e33771a_d8qrq4wf1tdg008zhwn0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobPositionModifyv1_42a690898fff71882fb2969493d62657_d8qrq4wf1tdg008zhwng_Position_Modified') 
        async CT006PFPFDECPHRMaddJobPositionModifyv1_42a690898fff71882fb2969493d62657_d8qrq4wf1tdg008zhwng_Position_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobPositionModifyv1_8fe8bdb16b48400a76674bf7c677c78a_d8qrq4wf1tdg008zhwp0_Position_Deleted') 
        async CT006PFPFDECPHRMaddJobPositionModifyv1_8fe8bdb16b48400a76674bf7c677c78a_d8qrq4wf1tdg008zhwp0_Position_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}