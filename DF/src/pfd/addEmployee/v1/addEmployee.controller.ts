import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addEmployeeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewEmployeesv1CT006PFPFDECPHRMaddEmployeev1_f0014e01609d494cb0b5dca2db935376_86a153f22b2040d2b95c9e81cc7c5b7c111_RequestInitiated') 
        async CT006UFUFWECPHRMnewEmployeesv1CT006PFPFDECPHRMaddEmployeev1_f0014e01609d494cb0b5dca2db935376_86a153f22b2040d2b95c9e81cc7c5b7c111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddEmployeev1_0031275dfcf245a3afa98a3138007ff4_d8hvdcx897sg00879cc0_RequestCompleted') 
        async CT006PFPFDECPHRMaddEmployeev1_0031275dfcf245a3afa98a3138007ff4_d8hvdcx897sg00879cc0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}