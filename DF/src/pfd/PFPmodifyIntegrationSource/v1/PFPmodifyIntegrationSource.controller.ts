import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyIntegrationSourceController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddIntegrationSourcev1CT003PFPFDTAGTAGmodifyIntegrationSourcev1_950142be4eff4c758ab8bebb73fc3e30_6611ce1fba41405992f77e358eb3903e111_UpdateSuccess') 
        async CT003UFUFWTAGTAGaddIntegrationSourcev1CT003PFPFDTAGTAGmodifyIntegrationSourcev1_950142be4eff4c758ab8bebb73fc3e30_6611ce1fba41405992f77e358eb3903e111_UpdateSuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyIntegrationSourcev1_331498af35534c0c88be3ea6fdd1af88_darhsn6h1bp0008fbf5g_edit') 
        async CT003PFPFDTAGTAGmodifyIntegrationSourcev1_331498af35534c0c88be3ea6fdd1af88_darhsn6h1bp0008fbf5g_edit(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyIntegrationSourcev1_6ca67aa269884f848ea0beeb654ce479_darfccsh1bp0008fap80_updated') 
        async CT003PFPFDTAGTAGmodifyIntegrationSourcev1_6ca67aa269884f848ea0beeb654ce479_darfccsh1bp0008fap80_updated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}