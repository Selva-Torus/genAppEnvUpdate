import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyCredentialRefController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCredentialRefv1CT003PFPFDTAGTAGmodifyCredentialRefv1_88ab96e34f134639208bb0ed7c2bcc85_7c2ca75ce85a0effb21033d94b9ca9ea111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCredentialRefv1CT003PFPFDTAGTAGmodifyCredentialRefv1_88ab96e34f134639208bb0ed7c2bcc85_7c2ca75ce85a0effb21033d94b9ca9ea111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteCredentialRefv1CT003PFPFDTAGTAGmodifyCredentialRefv1_88ab96e34f134639208bb0ed7c2bcc85_5ea8a7ff8807d18728c79824461c484c111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteCredentialRefv1CT003PFPFDTAGTAGmodifyCredentialRefv1_88ab96e34f134639208bb0ed7c2bcc85_5ea8a7ff8807d18728c79824461c484c111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCredentialRefv1_249797175bfd7f41e55535dfa7e5c1ef_dbpp1d5zkwr0008ybz70_decisionnode_initiated') 
        async CT003PFPFDTAGTAGmodifyCredentialRefv1_249797175bfd7f41e55535dfa7e5c1ef_dbpp1d5zkwr0008ybz70_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCredentialRefv1_057a0ab4c255ea4c01710fbb796f1afb_dbpp1d5zkwr0008ybz7g_Credential_updated') 
        async CT003PFPFDTAGTAGmodifyCredentialRefv1_057a0ab4c255ea4c01710fbb796f1afb_dbpp1d5zkwr0008ybz7g_Credential_updated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCredentialRefv1_ee5bb7c34f68840c5c6a6f7693e5abe3_dbpp1d5zkwr0008ybz80_Credential_deleted') 
        async CT003PFPFDTAGTAGmodifyCredentialRefv1_ee5bb7c34f68840c5c6a6f7693e5abe3_dbpp1d5zkwr0008ybz80_Credential_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}