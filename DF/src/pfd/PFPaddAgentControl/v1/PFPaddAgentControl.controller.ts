import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAgentControlController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAgentControlv1CT003PFPFDTAGTAGaddAgentControlv1_d44501bc3f835aea57605a701cedf880_9ba267c0ab220953846d4abfca2b8eab111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAgentControlv1CT003PFPFDTAGTAGaddAgentControlv1_d44501bc3f835aea57605a701cedf880_9ba267c0ab220953846d4abfca2b8eab111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAgentControlv1_6ea405a4fd2a3007e1bd76f812c1b2e0_davtdedzkz4g0087949g_apinode_initiated') 
        async CT003PFPFDTAGTAGaddAgentControlv1_6ea405a4fd2a3007e1bd76f812c1b2e0_davtdedzkz4g0087949g_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}