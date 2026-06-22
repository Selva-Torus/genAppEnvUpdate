import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assignAssetController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSassignAssetv1CT006PFPFDECPAMSassignAssetv1_bbb95c5761ad4c419d71ddd2c4907a06_b62c7c288f174f1e9163f256269090a4111_RequestInitiated') 
        async CT006UFUFWECPAMSassignAssetv1CT006PFPFDECPAMSassignAssetv1_bbb95c5761ad4c419d71ddd2c4907a06_b62c7c288f174f1e9163f256269090a4111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassignAssetv1_74e30b2a352148b6809d60036a3eccf1_d8gq5w7p12v000803zf0_RequestCompleted') 
        async CT006PFPFDECPAMSassignAssetv1_74e30b2a352148b6809d60036a3eccf1_d8gq5w7p12v000803zf0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassignAssetv1_c748c92408ff4562b02832f56d6d48a5_d8gpsadg9fy0008vtt40_get_asset_id_by_asset_name_completed') 
        async CT006PFPFDECPAMSassignAssetv1_c748c92408ff4562b02832f56d6d48a5_d8gpsadg9fy0008vtt40_get_asset_id_by_asset_name_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}