import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddIntegrationRunController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddIntegrationRunv1CT003PFPFDTAGTAGaddIntegrationRunv1_dc3b4b71630942c2a8226b14232f885a_d5b4fc3ce8b04e40bdf420fd51fda220111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddIntegrationRunv1CT003PFPFDTAGTAGaddIntegrationRunv1_dc3b4b71630942c2a8226b14232f885a_d5b4fc3ce8b04e40bdf420fd51fda220111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddIntegrationRunv1_0a705f2c0ebb43569c5ed86de7c95581_daswcehzkz4g008xgeyg_DataSaved') 
        async CT003PFPFDTAGTAGaddIntegrationRunv1_0a705f2c0ebb43569c5ed86de7c95581_daswcehzkz4g008xgeyg_DataSaved(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}