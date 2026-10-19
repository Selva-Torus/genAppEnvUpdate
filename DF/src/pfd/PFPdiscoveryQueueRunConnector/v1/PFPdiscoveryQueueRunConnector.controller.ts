import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdiscoveryQueueRunConnectorController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdiscoveryQueuev1CT003PFPFDTAGTAGdiscoveryQueueRunConnectorv1_b717f8d829df4a7d9138f566729a1fa6_e7f99dfc145c445daadc5c597ecea7af111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdiscoveryQueuev1CT003PFPFDTAGTAGdiscoveryQueueRunConnectorv1_b717f8d829df4a7d9138f566729a1fa6_e7f99dfc145c445daadc5c597ecea7af111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdiscoveryQueueRunConnectorv1_464690168e544f24bec3b2db046f6e38_db3p9tzrvk900085xheg_discovery_staging_initiated') 
        async CT003PFPFDTAGTAGdiscoveryQueueRunConnectorv1_464690168e544f24bec3b2db046f6e38_db3p9tzrvk900085xheg_discovery_staging_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}