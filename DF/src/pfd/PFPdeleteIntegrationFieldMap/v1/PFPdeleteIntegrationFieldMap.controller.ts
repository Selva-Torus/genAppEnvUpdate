import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteIntegrationFieldMapController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteIntegrationFieldMapv1CT003PFPFDTAGTAGdeleteIntegrationFieldMapv1_30d9be4563a494e2e2385f93a575ce72_d07a304ce455e5feb67cdbca273b2163111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteIntegrationFieldMapv1CT003PFPFDTAGTAGdeleteIntegrationFieldMapv1_30d9be4563a494e2e2385f93a575ce72_d07a304ce455e5feb67cdbca273b2163111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteIntegrationFieldMapv1_1d60c7ab387322556702c693b675cc22_dav1szzzkz4g008xmehg_deletedCompleted') 
        async CT003PFPFDTAGTAGdeleteIntegrationFieldMapv1_1d60c7ab387322556702c693b675cc22_dav1szzzkz4g008xmehg_deletedCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}