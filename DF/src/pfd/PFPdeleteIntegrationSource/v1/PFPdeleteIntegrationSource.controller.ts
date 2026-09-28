import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteIntegrationSourceController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteIntegrationSourcev1CT003PFPFDTAGTAGdeleteIntegrationSourcev1_55f57ffd68bd4e539fc47a5fc5adbe14_96d208e2f7f142a58c11a10940bb4584111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteIntegrationSourcev1CT003PFPFDTAGTAGdeleteIntegrationSourcev1_55f57ffd68bd4e539fc47a5fc5adbe14_96d208e2f7f142a58c11a10940bb4584111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteIntegrationSourcev1_73b0d86c336c4c14a340cc04bdddf5b4_darfdk6h1bp0008fapm0_deleted') 
        async CT003PFPFDTAGTAGdeleteIntegrationSourcev1_73b0d86c336c4c14a340cc04bdddf5b4_darfdk6h1bp0008fapm0_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}