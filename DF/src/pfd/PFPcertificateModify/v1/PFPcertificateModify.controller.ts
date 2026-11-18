import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPcertificateModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGeditCertificatev1CT003PFPFDTAGTAGcertificateModifyv1_1128c0c393ad40df857a524c2493caf9_09a2b7cbcd7794cad3420905a91ab504111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGeditCertificatev1CT003PFPFDTAGTAGcertificateModifyv1_1128c0c393ad40df857a524c2493caf9_09a2b7cbcd7794cad3420905a91ab504111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGcertificateModifyv1_b0f9505e29944b49b85fc22cb36b18f0_db7qebhrvk9000864abg_apinode_initiated') 
        async CT003PFPFDTAGTAGcertificateModifyv1_b0f9505e29944b49b85fc22cb36b18f0_db7qebhrvk9000864abg_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}