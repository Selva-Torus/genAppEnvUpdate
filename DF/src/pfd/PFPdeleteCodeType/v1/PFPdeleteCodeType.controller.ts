import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteCodeTypeController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteCodeTypev1CT003PFPFDTAGTAGdeleteCodeTypev1_016c51aabfa4464fa46fc7754fa86c6c_f320ccb3b4b342fb981d36d7c4a8e870111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteCodeTypev1CT003PFPFDTAGTAGdeleteCodeTypev1_016c51aabfa4464fa46fc7754fa86c6c_f320ccb3b4b342fb981d36d7c4a8e870111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteCodeTypev1_770ec540d1c646929b68ab7f2a46a3c1_damkftfh1bp0008f64cg_deleted') 
        async CT003PFPFDTAGTAGdeleteCodeTypev1_770ec540d1c646929b68ab7f2a46a3c1_damkftfh1bp0008f64cg_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}