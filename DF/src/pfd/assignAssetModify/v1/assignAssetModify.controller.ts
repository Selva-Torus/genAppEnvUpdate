import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assignAssetModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSassignAssetv1CT006PFPFDECPAMSassignAssetModifyv1_82c772edca1542c2b3db7231dfcc8050_926ec6edcfda442db95fc6e89abdc4e0111_RequestInitiated') 
        async CT006UFUFWECPAMSassignAssetv1CT006PFPFDECPAMSassignAssetModifyv1_82c772edca1542c2b3db7231dfcc8050_926ec6edcfda442db95fc6e89abdc4e0111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSassignAssetDeletev1CT006PFPFDECPAMSassignAssetModifyv1_82c772edca1542c2b3db7231dfcc8050_370ea4b01c495c84b69e089a018fa294111_RequestInitiated') 
        async CT006UFUFWECPAMSassignAssetDeletev1CT006PFPFDECPAMSassignAssetModifyv1_82c772edca1542c2b3db7231dfcc8050_370ea4b01c495c84b69e089a018fa294111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassignAssetModifyv1_9bed99f70c4c4f5191bd3411c46e7aad_d8h7tesp12v000805e50_RequestCompleted') 
        async CT006PFPFDECPAMSassignAssetModifyv1_9bed99f70c4c4f5191bd3411c46e7aad_d8h7tesp12v000805e50_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassignAssetModifyv1_5385a2feb6d3439da3fa04b55f6649f1_d8h7tesp12v000805e5g_Assign_Modified') 
        async CT006PFPFDECPAMSassignAssetModifyv1_5385a2feb6d3439da3fa04b55f6649f1_d8h7tesp12v000805e5g_Assign_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassignAssetModifyv1_e965712c7d94421a9caa9f63362f7560_d8h7tesp12v000805e60_Assign_Deleted') 
        async CT006PFPFDECPAMSassignAssetModifyv1_e965712c7d94421a9caa9f63362f7560_d8h7tesp12v000805e60_Assign_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}