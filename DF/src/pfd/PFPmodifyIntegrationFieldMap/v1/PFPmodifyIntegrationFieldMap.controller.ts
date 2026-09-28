import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyIntegrationFieldMapController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddIntegrationFieldMapv1CT003PFPFDTAGTAGmodifyIntegrationFieldMapv1_fe7c5658d02275995470a63f3bece013_91fcfc320d9d475bb57f7042de7e097d111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddIntegrationFieldMapv1CT003PFPFDTAGTAGmodifyIntegrationFieldMapv1_fe7c5658d02275995470a63f3bece013_91fcfc320d9d475bb57f7042de7e097d111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyIntegrationFieldMapv1_82de73538cfec3bc3efa35c446e906fa_dav1nbdzkz4g008xmb8g_updateCompleted') 
        async CT003PFPFDTAGTAGmodifyIntegrationFieldMapv1_82de73538cfec3bc3efa35c446e906fa_dav1nbdzkz4g008xmb8g_updateCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyIntegrationFieldMapv1_5a9e412cd099610c98d520808e8e9c8b_dav1nbdzkz4g008xmb90_edit') 
        async CT003PFPFDTAGTAGmodifyIntegrationFieldMapv1_5a9e412cd099610c98d520808e8e9c8b_dav1nbdzkz4g008xmb90_edit(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}