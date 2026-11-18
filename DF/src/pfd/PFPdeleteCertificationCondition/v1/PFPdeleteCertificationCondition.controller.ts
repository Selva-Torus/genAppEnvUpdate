import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteCertificationConditionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteCertificationConditionv1CT003PFPFDTAGTAGdeleteCertificationConditionv1_5b3338ae84334d20a11d197985517c6e_53f32991974b1804010fedbb7205ea29111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteCertificationConditionv1CT003PFPFDTAGTAGdeleteCertificationConditionv1_5b3338ae84334d20a11d197985517c6e_53f32991974b1804010fedbb7205ea29111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteCertificationConditionv1_3a68dba49509426aabbbc666e8c36bed_db8aat3rvk9000865mhg_apinode_initiated') 
        async CT003PFPFDTAGTAGdeleteCertificationConditionv1_3a68dba49509426aabbbc666e8c36bed_db8aat3rvk9000865mhg_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}