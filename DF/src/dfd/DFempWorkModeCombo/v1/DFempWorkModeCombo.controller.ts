import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFempWorkModeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('empWorkModeCombo_f305454d54d34db1810d0f2d04a2e48e_RequestInitiated') 
        async empWorkModeCombo_f305454d54d34db1810d0f2d04a2e48e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}