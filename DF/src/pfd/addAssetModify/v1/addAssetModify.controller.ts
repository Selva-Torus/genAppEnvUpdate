import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addAssetModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSdeleteScreenv1CT006PFPFDECPAMSaddAssetModifyv1_21f3396f59cf4f5e92de3623422fdb6a_bc56a31e9cea48a5aeb4bbcf93658a95111_RequestInitiation') 
        async CT006UFUFWECPAMSdeleteScreenv1CT006PFPFDECPAMSaddAssetModifyv1_21f3396f59cf4f5e92de3623422fdb6a_bc56a31e9cea48a5aeb4bbcf93658a95111_RequestInitiation(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMSnewAssetv1CT006PFPFDECPAMSaddAssetModifyv1_21f3396f59cf4f5e92de3623422fdb6a_6ce67082c491432496b9a3c15c910522111_RequestInitaition') 
        async CT006UFUFWECPAMSnewAssetv1CT006PFPFDECPAMSaddAssetModifyv1_21f3396f59cf4f5e92de3623422fdb6a_6ce67082c491432496b9a3c15c910522111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetModifyv1_2ea7ab9bb7f243d29f2244f01a6b553a_d8h7cfsp12v0008056k0_RequestCompleted') 
        async CT006PFPFDECPAMSaddAssetModifyv1_2ea7ab9bb7f243d29f2244f01a6b553a_d8h7cfsp12v0008056k0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetModifyv1_af32c47c5f9447c7a81251344cda7505_d8h7cfsp12v0008056kg_Asset_Modified') 
        async CT006PFPFDECPAMSaddAssetModifyv1_af32c47c5f9447c7a81251344cda7505_d8h7cfsp12v0008056kg_Asset_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetModifyv1_2e483973322542e3808f0cb886e6b0f9_d8h7cfsp12v0008056m0_Asset_Deleted') 
        async CT006PFPFDECPAMSaddAssetModifyv1_2e483973322542e3808f0cb886e6b0f9_d8h7cfsp12v0008056m0_Asset_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}