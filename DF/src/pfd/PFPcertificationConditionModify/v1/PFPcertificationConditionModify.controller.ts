import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPcertificationConditionModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCertificationConditionv1CT003PFPFDTAGTAGcertificationConditionModifyv1_c7c7b68bc2974da5b48922eee29e287b_81860f86633664bee0b5298bfc0f97f3111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCertificationConditionv1CT003PFPFDTAGTAGcertificationConditionModifyv1_c7c7b68bc2974da5b48922eee29e287b_81860f86633664bee0b5298bfc0f97f3111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGcertificationConditionModifyv1_c44f77d770e846f0abc0bca5085755a1_db865axrvk9000864shg_apinode_initiated') 
        async CT003PFPFDTAGTAGcertificationConditionModifyv1_c44f77d770e846f0abc0bca5085755a1_db865axrvk9000864shg_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}