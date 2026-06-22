import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class assetSoftwareLicensesController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPAMSaddLicensev1CT006PFPFDECPAMSassetSoftwareLicensesv1_f39995a0457a430ea32df22e39eea3d6_479bcc53da9a474e9b1345feda13b16e111_RequestInitiated') 
        async CT006UFUFWECPAMSaddLicensev1CT006PFPFDECPAMSassetSoftwareLicensesv1_f39995a0457a430ea32df22e39eea3d6_479bcc53da9a474e9b1345feda13b16e111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesv1_fae993c17ba342bdbd94a266d44db7d0_d8tfwt3rvxrg008vtp6g_RequestCompleted') 
        async CT006PFPFDECPAMSassetSoftwareLicensesv1_fae993c17ba342bdbd94a266d44db7d0_d8tfwt3rvxrg008vtp6g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesv1_595c9fbd3cc846789b95322ccdc71955_d8gqrr3p12v0008047sg_get_vendor_id_initiated') 
        async CT006PFPFDECPAMSassetSoftwareLicensesv1_595c9fbd3cc846789b95322ccdc71955_d8gqrr3p12v0008047sg_get_vendor_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPAMSassetSoftwareLicensesv1_4f0426185c6046448c62b000a4eb8653_d8gqka5p12v0008046ng_get_vendor_id_completed') 
        async CT006PFPFDECPAMSassetSoftwareLicensesv1_4f0426185c6046448c62b000a4eb8653_d8gqka5p12v0008046ng_get_vendor_id_completed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}