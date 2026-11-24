import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfInvestigationTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfInvestigationTypeCombo_311db76ec4ad40c0a8f12851682b897c_RequestInitiated') 
        async nfInvestigationTypeCombo_311db76ec4ad40c0a8f12851682b897c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}