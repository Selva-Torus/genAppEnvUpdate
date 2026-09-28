import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyIntegrationRunController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddIntegrationRunv1CT003PFPFDTAGTAGmodifyIntegrationRunv1_af5ac714792d46dda07a508d50e38223_2b722957f5c54bfb90d8adcd31523a6d111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddIntegrationRunv1CT003PFPFDTAGTAGmodifyIntegrationRunv1_af5ac714792d46dda07a508d50e38223_2b722957f5c54bfb90d8adcd31523a6d111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyIntegrationRunv1_a1a5fa8f4013461da5b2a5d23abfc0a5_daswdmpzkz4g008xgfag_success') 
        async CT003PFPFDTAGTAGmodifyIntegrationRunv1_a1a5fa8f4013461da5b2a5d23abfc0a5_daswdmpzkz4g008xgfag_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}