import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPupdateCodeTypeController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCodeTypesv1CT003PFPFDTAGTAGupdateCodeTypev1_6a9e49a07a0748b2923320fca06ba0fd_92d9b878dbc04d9185a14c77407d1e18111_Updatesuccess') 
        async CT003UFUFWTAGTAGaddCodeTypesv1CT003PFPFDTAGTAGupdateCodeTypev1_6a9e49a07a0748b2923320fca06ba0fd_92d9b878dbc04d9185a14c77407d1e18111_Updatesuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGupdateCodeTypev1_312990f395fa48f5a21c57b3033320e3_damkc1rh1bp0008f62jg_success') 
        async CT003PFPFDTAGTAGupdateCodeTypev1_312990f395fa48f5a21c57b3033320e3_damkc1rh1bp0008f62jg_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}