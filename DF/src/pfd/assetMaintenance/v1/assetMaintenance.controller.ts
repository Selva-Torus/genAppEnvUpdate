import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assetMaintenanceController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSlogMaintenancev1CT006PFPFDECPAMSassetMaintenancev1_f5a6cd2800cc470dadf1b607de22f9db_d628ec7437604cff879a668d048133fb111_RequestInitiated') 
        async CT006UFUFWECPAMSlogMaintenancev1CT006PFPFDECPAMSassetMaintenancev1_f5a6cd2800cc470dadf1b607de22f9db_d628ec7437604cff879a668d048133fb111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetMaintenancev1_34c254cbf213423d8814df42a49cbf5f_d8gqgmjp12v0008043hg_RequestCompleted') 
        async CT006PFPFDECPAMSassetMaintenancev1_34c254cbf213423d8814df42a49cbf5f_d8gqgmjp12v0008043hg_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetMaintenancev1_2dcc1fad1ebe40c4b6585b5006f7b543_d8gqa18p12v0008041v0_get_asset_id_by_asset_name_completed') 
        async CT006PFPFDECPAMSassetMaintenancev1_2dcc1fad1ebe40c4b6585b5006f7b543_d8gqa18p12v0008041v0_get_asset_id_by_asset_name_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}