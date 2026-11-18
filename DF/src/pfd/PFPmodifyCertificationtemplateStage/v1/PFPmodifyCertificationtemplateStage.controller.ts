import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyCertificationtemplateStageController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCertificationStagev1CT003PFPFDTAGTAGmodifyCertificationtemplateStagev1_5f58fc8921ba4f27812753db496b9efa_0b5e0c1c36e94f75b16717b289f036c7111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCertificationStagev1CT003PFPFDTAGTAGmodifyCertificationtemplateStagev1_5f58fc8921ba4f27812753db496b9efa_0b5e0c1c36e94f75b16717b289f036c7111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCertificationtemplateStagev1_6810db5b032f4d0dade7a0d18918c7d2_daxmq4mzkz4g0087bp6g_updated_success') 
        async CT003PFPFDTAGTAGmodifyCertificationtemplateStagev1_6810db5b032f4d0dade7a0d18918c7d2_daxmq4mzkz4g0087bp6g_updated_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCertificationtemplateStagev1_8cae555c60314cb7bf5bdd10269ddb5b_dav5qvqzkz4g00878t30_update') 
        async CT003PFPFDTAGTAGmodifyCertificationtemplateStagev1_8cae555c60314cb7bf5bdd10269ddb5b_dav5qvqzkz4g00878t30_update(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}