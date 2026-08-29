import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class Request_form_default_eventController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT001UFUFWTAMTARequestformv1CT001PFPFDTAMTARequestformdefaulteventv1_4414bc997bdd4eaa99a8f9b22a8cd453_7ad064a4534a45e68842944eacdec42b111_Requestinitiated') 
        async CT001UFUFWTAMTARequestformv1CT001PFPFDTAMTARequestformdefaulteventv1_4414bc997bdd4eaa99a8f9b22a8cd453_7ad064a4534a45e68842944eacdec42b111_Requestinitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT001PFPFDTAMTARequestformdefaulteventv1_6dbd241513df4cebbd2d8446e8c7a7ff_d8sxq342ebc0008xv4eg_data_proceed') 
        async CT001PFPFDTAMTARequestformdefaulteventv1_6dbd241513df4cebbd2d8446e8c7a7ff_d8sxq342ebc0008xv4eg_data_proceed(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}