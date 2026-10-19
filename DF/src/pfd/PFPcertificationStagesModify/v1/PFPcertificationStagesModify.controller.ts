import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPcertificationStagesModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGeditCertificationStagesv1CT003PFPFDTAGTAGcertificationStagesModifyv1_ccaf76f81b98d2260b865818c68c7aef_807e6c164d884703b04366cbbf4fda6f111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGeditCertificationStagesv1CT003PFPFDTAGTAGcertificationStagesModifyv1_ccaf76f81b98d2260b865818c68c7aef_807e6c164d884703b04366cbbf4fda6f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGcertificationStagesModifyv1_3b5c87437666ba8f5bb444da021f7e90_db7qwt3rvk9000864ez0_apinode_initiated') 
        async CT003PFPFDTAGTAGcertificationStagesModifyv1_3b5c87437666ba8f5bb444da021f7e90_db7qwt3rvk9000864ez0_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}