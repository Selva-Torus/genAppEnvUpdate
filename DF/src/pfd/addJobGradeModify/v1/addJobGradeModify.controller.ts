import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addJobGradeModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaddEmployeeJobGradev1CT006PFPFDECPHRMaddJobGradeModifyv1_b8e3a884453776e3ae295fcb9ff4ceb9_9a3b28ff649f1898bc0d6d08dea4ce10111_RequestInitiated') 
        async CT006UFUFWECPHRMaddEmployeeJobGradev1CT006PFPFDECPHRMaddJobGradeModifyv1_b8e3a884453776e3ae295fcb9ff4ceb9_9a3b28ff649f1898bc0d6d08dea4ce10111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMemployeeJobGradeDeletev1CT006PFPFDECPHRMaddJobGradeModifyv1_b8e3a884453776e3ae295fcb9ff4ceb9_2a322b3cb4194d75253311ded87504a2111_RequestInitiated') 
        async CT006UFUFWECPHRMemployeeJobGradeDeletev1CT006PFPFDECPHRMaddJobGradeModifyv1_b8e3a884453776e3ae295fcb9ff4ceb9_2a322b3cb4194d75253311ded87504a2111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobGradeModifyv1_c677a58585b7a1cd37ea801ec37ceeea_f61bd4125dd346468663057fefbcb2cb_RequestCompleted') 
        async CT006PFPFDECPHRMaddJobGradeModifyv1_c677a58585b7a1cd37ea801ec37ceeea_f61bd4125dd346468663057fefbcb2cb_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobGradeModifyv1_fbccd2900c7846073d34259f40201e3c_48ab63218e0842c8ad5f0b10453b4717_Grade_Modified') 
        async CT006PFPFDECPHRMaddJobGradeModifyv1_fbccd2900c7846073d34259f40201e3c_48ab63218e0842c8ad5f0b10453b4717_Grade_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobGradeModifyv1_e993e1178fe6d7039cf1b1a4d08641bf_649ef3fc082b48a0bd73fafd9a260e10_Grade_Deleted') 
        async CT006PFPFDECPHRMaddJobGradeModifyv1_e993e1178fe6d7039cf1b1a4d08641bf_649ef3fc082b48a0bd73fafd9a260e10_Grade_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}