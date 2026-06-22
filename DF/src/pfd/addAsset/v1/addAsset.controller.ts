import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addAssetController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSnewAssetv1CT006PFPFDECPAMSaddAssetv1_4883a592c3cf41958418badffa79bdfe_06abf2e59bd44a94b74a4918bc21b88e111_RequestInitiated') 
        async CT006UFUFWECPAMSnewAssetv1CT006PFPFDECPAMSaddAssetv1_4883a592c3cf41958418badffa79bdfe_06abf2e59bd44a94b74a4918bc21b88e111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetv1_33aae461ddfa4e6ba0f2125764db2b04_d8ktyga3e460008ewds0_RequestCompleted') 
        async CT006PFPFDECPAMSaddAssetv1_33aae461ddfa4e6ba0f2125764db2b04_d8ktyga3e460008ewds0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetv1_e790dd610e7442e385a102a8694713e7_d8rd2gjf1tdg008zkkw0_get_acat_id_completed') 
        async CT006PFPFDECPAMSaddAssetv1_e790dd610e7442e385a102a8694713e7_d8rd2gjf1tdg008zkkw0_get_acat_id_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddAssetv1_5a6ad36f3f064864b349fcd58bbea17c_d8g2r81t5gp0008dkpcg_get_vendor_id_completed') 
        async CT006PFPFDECPAMSaddAssetv1_5a6ad36f3f064864b349fcd58bbea17c_d8g2r81t5gp0008dkpcg_get_vendor_id_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}