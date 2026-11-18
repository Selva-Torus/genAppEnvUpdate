import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddRevocationReceiptController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddRevocationReceiptv1CT003PFPFDTAGTAGaddRevocationReceiptv1_26ae7041b215fcb4b7efb6d60d58bd30_af76c354a595e9367e3aa1c9de5bfa1e111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddRevocationReceiptv1CT003PFPFDTAGTAGaddRevocationReceiptv1_26ae7041b215fcb4b7efb6d60d58bd30_af76c354a595e9367e3aa1c9de5bfa1e111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddRevocationReceiptv1_a89716bd4baf9ce6e34f4f1e14b5f098_dby4410s6j5g008y9qsg_humantasknode_initiated_success') 
        async CT003PFPFDTAGTAGaddRevocationReceiptv1_a89716bd4baf9ce6e34f4f1e14b5f098_dby4410s6j5g008y9qsg_humantasknode_initiated_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}