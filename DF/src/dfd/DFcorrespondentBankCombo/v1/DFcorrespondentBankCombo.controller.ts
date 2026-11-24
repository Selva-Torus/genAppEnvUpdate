import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcorrespondentBankComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('correspondentBankCombo_d0bd9ea001df466ea48a404758761a8a_RequestInitiated') 
        async correspondentBankCombo_d0bd9ea001df466ea48a404758761a8a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}