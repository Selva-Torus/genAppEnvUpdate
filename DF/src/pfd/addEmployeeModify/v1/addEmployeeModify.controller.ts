import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addEmployeeModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewEmployeesv1CT006PFPFDECPHRMaddEmployeeModifyv1_21f3396f59cf4f5e92de3623422fdb6a_8bc69d6bf9f64385abdd380859ed6240111_RequestInitaition') 
        async CT006UFUFWECPHRMnewEmployeesv1CT006PFPFDECPHRMaddEmployeeModifyv1_21f3396f59cf4f5e92de3623422fdb6a_8bc69d6bf9f64385abdd380859ed6240111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMemployeeDeletev1CT006PFPFDECPHRMaddEmployeeModifyv1_21f3396f59cf4f5e92de3623422fdb6a_2f9d1bea7a8025061dfd005f18d3d34b111_RequestInitiated') 
        async CT006UFUFWECPHRMemployeeDeletev1CT006PFPFDECPHRMaddEmployeeModifyv1_21f3396f59cf4f5e92de3623422fdb6a_2f9d1bea7a8025061dfd005f18d3d34b111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddEmployeeModifyv1_2ea7ab9bb7f243d29f2244f01a6b553a_d8kvyc93e460008ex01g_RequestCompleted') 
        async CT006PFPFDECPHRMaddEmployeeModifyv1_2ea7ab9bb7f243d29f2244f01a6b553a_d8kvyc93e460008ex01g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddEmployeeModifyv1_af32c47c5f9447c7a81251344cda7505_d8kvyc93e460008ex020_Employee_Modified') 
        async CT006PFPFDECPHRMaddEmployeeModifyv1_af32c47c5f9447c7a81251344cda7505_d8kvyc93e460008ex020_Employee_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddEmployeeModifyv1_2e483973322542e3808f0cb886e6b0f9_d8kvyc93e460008ex02g_Employee_Deleted') 
        async CT006PFPFDECPHRMaddEmployeeModifyv1_2e483973322542e3808f0cb886e6b0f9_d8kvyc93e460008ex02g_Employee_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}