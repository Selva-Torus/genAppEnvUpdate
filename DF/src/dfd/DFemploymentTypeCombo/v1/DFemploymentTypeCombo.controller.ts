import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFemploymentTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('employmentTypeCombo_7572504d5bff471591fd122afddbe21b_RequestInitiated') 
        async employmentTypeCombo_7572504d5bff471591fd122afddbe21b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}