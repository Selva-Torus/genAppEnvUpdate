import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addCategoryController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddCategoryv1CT006PFPFDECPAMSaddCategoryv1_7ed190238b52498484f3735c45150108_2c0aa58125154c86a086d77092d240df111_RequestInitiated') 
        async CT006UFUFWECPAMSaddCategoryv1CT006PFPFDECPAMSaddCategoryv1_7ed190238b52498484f3735c45150108_2c0aa58125154c86a086d77092d240df111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryv1_cd8951650096446b9292bcd0ed5f12ed_d8p0fpp5mv600087xyk0_RequestCompleted') 
        async CT006PFPFDECPAMSaddCategoryv1_cd8951650096446b9292bcd0ed5f12ed_d8p0fpp5mv600087xyk0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSaddCategoryv1_08c1c7b57c6b49579be37cd2939a6afc_d8nwb8xer2g000861pe0_GetParentIDRequestCompleted') 
        async CT006PFPFDECPAMSaddCategoryv1_08c1c7b57c6b49579be37cd2939a6afc_d8nwb8xer2g000861pe0_GetParentIDRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}