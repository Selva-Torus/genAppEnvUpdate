import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrevocationEnforcementComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('revocationEnforcementCombo_219c8e494454c8ca6e4ae00373ea94c5_RequestInitiated') 
        async revocationEnforcementCombo_219c8e494454c8ca6e4ae00373ea94c5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}