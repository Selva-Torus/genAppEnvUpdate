import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class leaveManageDocumentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMleaveManagementDocumentv1CT006PFPFDECPHRMleaveManageDocumentv1_eed9cb662cef7dac727d472da73cf567_1b5717bf2309bee5c1908a101ebdaa1e111_RequestInitiated') 
        async CT006UFUFWECPHRMleaveManagementDocumentv1CT006PFPFDECPHRMleaveManageDocumentv1_eed9cb662cef7dac727d472da73cf567_1b5717bf2309bee5c1908a101ebdaa1e111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMleaveManageDocDeletev1CT006PFPFDECPHRMleaveManageDocumentv1_eed9cb662cef7dac727d472da73cf567_802b79cad398f7f47a05491b82e0c2f2111_RequestInitiated') 
        async CT006UFUFWECPHRMleaveManageDocDeletev1CT006PFPFDECPHRMleaveManageDocumentv1_eed9cb662cef7dac727d472da73cf567_802b79cad398f7f47a05491b82e0c2f2111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMleaveManageDocumentv1_55a5c9d5d0684120b3b4b6b856a46017_c51844ba318248118645835519130010_RequestCompleted') 
        async CT006PFPFDECPHRMleaveManageDocumentv1_55a5c9d5d0684120b3b4b6b856a46017_c51844ba318248118645835519130010_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMleaveManageDocumentv1_8222948cfe783fb59cf6846b4c32251b_3ff610fa097044ccb94485eafcb8e944_Document_Inserted') 
        async CT006PFPFDECPHRMleaveManageDocumentv1_8222948cfe783fb59cf6846b4c32251b_3ff610fa097044ccb94485eafcb8e944_Document_Inserted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMleaveManageDocumentv1_26413a9151e3ff9a5c32a96c239d4212_14e66a1c813c44ebbadbde4a0fc53652_Document_Deleted') 
        async CT006PFPFDECPHRMleaveManageDocumentv1_26413a9151e3ff9a5c32a96c239d4212_14e66a1c813c44ebbadbde4a0fc53652_Document_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}