import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addLeaveRequestApprovalController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMapplyLeaveApprovalv1CT006PFPFDECPHRMaddLeaveRequestApprovalv1_9e756f0a1ba8410787f4ea0719fde5b7_e2e94d5114d5e32ec008f6d07238ac85111_RequestInitiated') 
        async CT006UFUFWECPHRMapplyLeaveApprovalv1CT006PFPFDECPHRMaddLeaveRequestApprovalv1_9e756f0a1ba8410787f4ea0719fde5b7_e2e94d5114d5e32ec008f6d07238ac85111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMapplyLeaveApprovalv1CT006PFPFDECPHRMaddLeaveRequestApprovalv1_9e756f0a1ba8410787f4ea0719fde5b7_fdbeb312f4749bcd8f18832173a60190111_RequestInitiated') 
        async CT006UFUFWECPHRMapplyLeaveApprovalv1CT006PFPFDECPHRMaddLeaveRequestApprovalv1_9e756f0a1ba8410787f4ea0719fde5b7_fdbeb312f4749bcd8f18832173a60190111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeaveRequestApprovalv1_d75a41ed70bd478680ff2594e5fddd60_d97s9k6gg2r00088s9y0_RequestCompleted') 
        async CT006PFPFDECPHRMaddLeaveRequestApprovalv1_d75a41ed70bd478680ff2594e5fddd60_d97s9k6gg2r00088s9y0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeaveRequestApprovalv1_923721bdc86f4bed86c600ec76390491_d97s9k6gg2r00088s9yg_Rejected') 
        async CT006PFPFDECPHRMaddLeaveRequestApprovalv1_923721bdc86f4bed86c600ec76390491_d97s9k6gg2r00088s9yg_Rejected(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddLeaveRequestApprovalv1_44ef14fff61d405580feba646ae20657_d97s9k6gg2r00088s9z0_Approved') 
        async CT006PFPFDECPHRMaddLeaveRequestApprovalv1_44ef14fff61d405580feba646ae20657_d97s9k6gg2r00088s9z0_Approved(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}