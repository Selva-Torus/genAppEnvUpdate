import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFipmessageTypeStimulatorComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('ipmessageTypeStimulatorCombo_ee973f9efaf34f8ab1f8ca4af2956da3_RequestInitiated') 
        async ipmessageTypeStimulatorCombo_ee973f9efaf34f8ab1f8ca4af2956da3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}