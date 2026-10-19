import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddCodeTypeController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCodeTypesv1CT003PFPFDTAGTAGaddCodeTypev1_9a190433fc2545509a0312eb0664baca_def271a8571842ae9f79f8963b014068111_Savesuccessfully') 
        async CT003UFUFWTAGTAGaddCodeTypesv1CT003PFPFDTAGTAGaddCodeTypev1_9a190433fc2545509a0312eb0664baca_def271a8571842ae9f79f8963b014068111_Savesuccessfully(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCodeTypev1_5626b62064474aacafa1147dc1df24e6_dan8bpeh1bp0008f816g_SaveSuccess') 
        async CT003PFPFDTAGTAGaddCodeTypev1_5626b62064474aacafa1147dc1df24e6_dan8bpeh1bp0008f816g_SaveSuccess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}