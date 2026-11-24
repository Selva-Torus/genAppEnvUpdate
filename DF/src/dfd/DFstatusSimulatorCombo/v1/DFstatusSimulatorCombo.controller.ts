import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFstatusSimulatorComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('statusSimulatorCombo_f6c68183fefb61822587f7faf4204add_RequestInitiated') 
        async statusSimulatorCombo_f6c68183fefb61822587f7faf4204add_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}