import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addJobPositionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMaddEmployeeJobPositionv1CT006PFPFDECPHRMaddJobPositionv1_f6531064c0a4c041cb9aba696def7e4b_bc8c6d8c1be89615cf1115d40c35f98e111_RequestInitiated') 
        async CT006UFUFWECPHRMaddEmployeeJobPositionv1CT006PFPFDECPHRMaddJobPositionv1_f6531064c0a4c041cb9aba696def7e4b_bc8c6d8c1be89615cf1115d40c35f98e111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobPositionv1_c2f59a614caa4a168fea1f25670ff78b_d8qrkq6f1tdg008zhs90_RequestSuccess') 
        async CT006PFPFDECPHRMaddJobPositionv1_c2f59a614caa4a168fea1f25670ff78b_d8qrkq6f1tdg008zhs90_RequestSuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddJobPositionv1_ba4754ddb6774c9ef46b9f5673b3ce8f_1774df2cc6494143971a091a5cd1e07a_DBRequestSuccess') 
        async CT006PFPFDECPHRMaddJobPositionv1_ba4754ddb6774c9ef46b9f5673b3ce8f_1774df2cc6494143971a091a5cd1e07a_DBRequestSuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}