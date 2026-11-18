import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddCredentialRefController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCredentialRefv1CT003PFPFDTAGTAGaddCredentialRefv1_be18bffe141b015e5fa83e250d5ba469_8329d1c0f5f4932458e93fae9b7a58ad111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCredentialRefv1CT003PFPFDTAGTAGaddCredentialRefv1_be18bffe141b015e5fa83e250d5ba469_8329d1c0f5f4932458e93fae9b7a58ad111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCredentialRefv1_43a483fb6f21001a5cfd6d2d3e17adf4_dbpnx85zkwr0008ybvk0_post_credential_ref_initiated') 
        async CT003PFPFDTAGTAGaddCredentialRefv1_43a483fb6f21001a5cfd6d2d3e17adf4_dbpnx85zkwr0008ybvk0_post_credential_ref_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}