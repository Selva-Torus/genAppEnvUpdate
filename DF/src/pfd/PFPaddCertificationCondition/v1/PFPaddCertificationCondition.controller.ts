import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddCertificationConditionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCertificationConditionv1CT003PFPFDTAGTAGaddCertificationConditionv1_755880e4cc1f48beb81a0fda8087335c_9526116a4cbe7d2f5f956043b9d377c9111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCertificationConditionv1CT003PFPFDTAGTAGaddCertificationConditionv1_755880e4cc1f48beb81a0fda8087335c_9526116a4cbe7d2f5f956043b9d377c9111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCertificationConditionv1_418a25f790804e51ba5914f8f17b6ec1_db85y20rvk9000864q00_apinode_initiated') 
        async CT003PFPFDTAGTAGaddCertificationConditionv1_418a25f790804e51ba5914f8f17b6ec1_db85y20rvk9000864q00_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}