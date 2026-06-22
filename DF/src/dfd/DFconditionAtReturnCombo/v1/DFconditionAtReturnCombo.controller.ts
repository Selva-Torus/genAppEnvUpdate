import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFconditionAtReturnComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('conditionAtReturnCombo_c51fbf339fde4981884462f59af33f41_RequestInitiated') 
        async conditionAtReturnCombo_c51fbf339fde4981884462f59af33f41_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}