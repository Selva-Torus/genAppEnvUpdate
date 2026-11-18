import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdiscoveryQueueResetConnectorController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdiscoveryQueuev1CT003PFPFDTAGTAGdiscoveryQueueResetConnectorv1_3ac32611449cf75daa7d6f835eb075c1_cfecb35620bb4a46a0970ebd6a0b8445111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdiscoveryQueuev1CT003PFPFDTAGTAGdiscoveryQueueResetConnectorv1_3ac32611449cf75daa7d6f835eb075c1_cfecb35620bb4a46a0970ebd6a0b8445111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryQueueResetConnectorv1_b38f3092c48423a2f1bc26003f78ee9d_db4x0q2rvk9000860prg_delete_discovery_staging_initiated') 
        async CT003PFPFDTAGTAGdiscoveryQueueResetConnectorv1_b38f3092c48423a2f1bc26003f78ee9d_db4x0q2rvk9000860prg_delete_discovery_staging_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}