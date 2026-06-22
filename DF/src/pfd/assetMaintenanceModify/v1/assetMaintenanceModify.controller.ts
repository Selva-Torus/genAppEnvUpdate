import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assetMaintenanceModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSlogMaintenancev1CT006PFPFDECPAMSassetMaintenanceModifyv1_d7f3324cb46d4a319d2fd37b2815a555_503acb50d28042d4b7101e687f95cdad111_RequestInitiated') 
        async CT006UFUFWECPAMSlogMaintenancev1CT006PFPFDECPAMSassetMaintenanceModifyv1_d7f3324cb46d4a319d2fd37b2815a555_503acb50d28042d4b7101e687f95cdad111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSmaintenanceDeletev1CT006PFPFDECPAMSassetMaintenanceModifyv1_d7f3324cb46d4a319d2fd37b2815a555_3ebf51922b660dc6120cc50a827d1793111_RequestInitiated') 
        async CT006UFUFWECPAMSmaintenanceDeletev1CT006PFPFDECPAMSassetMaintenanceModifyv1_d7f3324cb46d4a319d2fd37b2815a555_3ebf51922b660dc6120cc50a827d1793111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetMaintenanceModifyv1_814f0bb9eb4746f7802c11b71ec4e90a_d8h7m4gp12v0008059hg_RequestCompleted') 
        async CT006PFPFDECPAMSassetMaintenanceModifyv1_814f0bb9eb4746f7802c11b71ec4e90a_d8h7m4gp12v0008059hg_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetMaintenanceModifyv1_d796286b790c47b4b8c89d39659b8024_d8h7m4gp12v0008059j0_Updated') 
        async CT006PFPFDECPAMSassetMaintenanceModifyv1_d796286b790c47b4b8c89d39659b8024_d8h7m4gp12v0008059j0_Updated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetMaintenanceModifyv1_8e296dc0ded34b20b9c79322e9161854_d8h7m4gp12v0008059jg_Deleted') 
        async CT006PFPFDECPAMSassetMaintenanceModifyv1_8e296dc0ded34b20b9c79322e9161854_d8h7m4gp12v0008059jg_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}