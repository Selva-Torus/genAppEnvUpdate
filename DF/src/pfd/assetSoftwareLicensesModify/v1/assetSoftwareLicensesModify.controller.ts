import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assetSoftwareLicensesModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddLicensev1CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_1c8bbea33c0b4b5fa45dd594e2bf8bf4_2719e0ddd1bc48b1a16f36d28b40d16c111_RequestInitiated') 
        async CT006UFUFWECPAMSaddLicensev1CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_1c8bbea33c0b4b5fa45dd594e2bf8bf4_2719e0ddd1bc48b1a16f36d28b40d16c111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSlicenseDeletev1CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_1c8bbea33c0b4b5fa45dd594e2bf8bf4_a025997676377d4c9cdbdfa3125f3727111_RequestInitiated') 
        async CT006UFUFWECPAMSlicenseDeletev1CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_1c8bbea33c0b4b5fa45dd594e2bf8bf4_a025997676377d4c9cdbdfa3125f3727111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_ae7c67a4f61d4a97a8e0add975106a93_d8h7qppp12v000805cbg_RequestCompleted') 
        async CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_ae7c67a4f61d4a97a8e0add975106a93_d8h7qppp12v000805cbg_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_e8d07cf6ed81420fb0c43f4e6af71bc0_d8h7qppp12v000805cc0_Software_License_Modified') 
        async CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_e8d07cf6ed81420fb0c43f4e6af71bc0_d8h7qppp12v000805cc0_Software_License_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_89762fb1484c40e9a39f46fdcbb98e5f_d8h7qppp12v000805ccg_Software_License_Deleted') 
        async CT006PFPFDECPAMSassetSoftwareLicensesModifyv1_89762fb1484c40e9a39f46fdcbb98e5f_d8h7qppp12v000805ccg_Software_License_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}