import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcombo_dfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('combo_dfd_78bb95add98e422fa099d25fb7da6056_RequestInitiated') 
        async combo_dfd_78bb95add98e422fa099d25fb7da6056_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('combo_dfd_bc35a43779594592bfa1aaa0c033b476_RequestInitiated') 
        async combo_dfd_bc35a43779594592bfa1aaa0c033b476_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}