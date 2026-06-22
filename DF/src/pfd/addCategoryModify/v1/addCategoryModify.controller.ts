import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addCategoryModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddCategoryv1CT006PFPFDECPAMSaddCategoryModifyv1_7e34f665759a433b8349b40358d7811d_41cdad18843e4d3eb6db535023d74a1f111_RequestInitiated') 
        async CT006UFUFWECPAMSaddCategoryv1CT006PFPFDECPAMSaddCategoryModifyv1_7e34f665759a433b8349b40358d7811d_41cdad18843e4d3eb6db535023d74a1f111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPAMScategoryDeletev1CT006PFPFDECPAMSaddCategoryModifyv1_7e34f665759a433b8349b40358d7811d_34d93b13ee9d56945f87b2e9268c8577111_RequestInitiated') 
        async CT006UFUFWECPAMScategoryDeletev1CT006PFPFDECPAMSaddCategoryModifyv1_7e34f665759a433b8349b40358d7811d_34d93b13ee9d56945f87b2e9268c8577111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryModifyv1_b2f4f83416424190bc77f77a5225e27e_d8pee1g5mv60008f5p9g_RequestCompleted') 
        async CT006PFPFDECPAMSaddCategoryModifyv1_b2f4f83416424190bc77f77a5225e27e_d8pee1g5mv60008f5p9g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryModifyv1_f06c8d845a8b48999fb4f4603e64f507_d8pee1g5mv60008f5pa0_Category_Modified') 
        async CT006PFPFDECPAMSaddCategoryModifyv1_f06c8d845a8b48999fb4f4603e64f507_d8pee1g5mv60008f5pa0_Category_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryModifyv1_99185e1e267a4500a58533b030e4d8e9_d8pee1g5mv60008f5pag_Category_Deleted') 
        async CT006PFPFDECPAMSaddCategoryModifyv1_99185e1e267a4500a58533b030e4d8e9_d8pee1g5mv60008f5pag_Category_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}