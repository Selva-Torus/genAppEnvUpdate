import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcheckVerificationStatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('checkVerificationStatusCombo_eb64f47cfdfa6480d954999dbc9554a5_RequestInitiated') 
        async checkVerificationStatusCombo_eb64f47cfdfa6480d954999dbc9554a5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}