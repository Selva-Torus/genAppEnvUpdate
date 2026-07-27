import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFstateComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('stateCombo_4b9c52a23bdafe68410ca3054840bcfb_RequestInitiated') 
        async stateCombo_4b9c52a23bdafe68410ca3054840bcfb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}