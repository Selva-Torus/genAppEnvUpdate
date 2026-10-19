import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPapplyCertificateController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGapplyCertificationv1CT003PFPFDTAGTAGapplyCertificatev1_ae15abc7399749b533968f4949ee6598_3e678159f31146aa9b36c9b63567d66b111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGapplyCertificationv1CT003PFPFDTAGTAGapplyCertificatev1_ae15abc7399749b533968f4949ee6598_3e678159f31146aa9b36c9b63567d66b111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGapplyCertificatev1_fe26a4b4cb4599a0fc5e68e363cd4481_db465f5rvk900085xrvg_get_ai_asset_id_initiated') 
        async CT003PFPFDTAGTAGapplyCertificatev1_fe26a4b4cb4599a0fc5e68e363cd4481_db465f5rvk900085xrvg_get_ai_asset_id_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGapplyCertificatev1_5e4425d805ee4cb184e53e9bfe271483_db48fz7rvk900085yf8g_post_certification_initiated') 
        async CT003PFPFDTAGTAGapplyCertificatev1_5e4425d805ee4cb184e53e9bfe271483_db48fz7rvk900085yf8g_post_certification_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGapplyCertificatev1_9f28e67ee84b42ff81546faa8f756ec2_db4659drvk900085xrn0_post_certification_initiated_success') 
        async CT003PFPFDTAGTAGapplyCertificatev1_9f28e67ee84b42ff81546faa8f756ec2_db4659drvk900085xrn0_post_certification_initiated_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGapplyCertificatev1_5933b4f040d74e3da940f4c715b0b47c_db47v1crvk900085y3a0_post_certificate_success') 
        async CT003PFPFDTAGTAGapplyCertificatev1_5933b4f040d74e3da940f4c715b0b47c_db47v1crvk900085y3a0_post_certificate_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGapplyCertificatev1_ef619dbdf36a445a8b8efad2659d8791_db47v1crvk900085y3ag_apinode_initiated_success') 
        async CT003PFPFDTAGTAGapplyCertificatev1_ef619dbdf36a445a8b8efad2659d8791_db47v1crvk900085y3ag_apinode_initiated_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGapplyCertificatev1_aeae34734049416989b19394c59ff944_db90bd5rvk9000866hkg_End_initiated') 
        async CT003PFPFDTAGTAGapplyCertificatev1_aeae34734049416989b19394c59ff944_db90bd5rvk9000866hkg_End_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}