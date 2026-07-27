import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addLeaveRequestController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMapplyLeavev1CT006PFPFDECPHRMaddLeaveRequestv1_47609815e80744eca0ecfea9f406a906_0bc2de2112b8964c5bab616941a6811c111_humantask_initiated') 
        async CT006UFUFWECPHRMapplyLeavev1CT006PFPFDECPHRMaddLeaveRequestv1_47609815e80744eca0ecfea9f406a906_0bc2de2112b8964c5bab616941a6811c111_humantask_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeaveRequestv1_4bf0d7b8a87f4cc5b9d0bc2797750a15_d97rapagg2r00088s2c0_get_emp_id_initiated') 
        async CT006PFPFDECPHRMaddLeaveRequestv1_4bf0d7b8a87f4cc5b9d0bc2797750a15_d97rapagg2r00088s2c0_get_emp_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeaveRequestv1_036483393b944212859ddab12c2ebd27_d97rapagg2r00088s2cg_get_policy_id_initiated') 
        async CT006PFPFDECPHRMaddLeaveRequestv1_036483393b944212859ddab12c2ebd27_d97rapagg2r00088s2cg_get_policy_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeaveRequestv1_03b298e63e9d4134808307121b98c5b5_d97rapagg2r00088s2d0_waiting_approval') 
        async CT006PFPFDECPHRMaddLeaveRequestv1_03b298e63e9d4134808307121b98c5b5_d97rapagg2r00088s2d0_waiting_approval(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}