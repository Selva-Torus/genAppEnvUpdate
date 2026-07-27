import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreviewStatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('reviewStatusCombo_e3c41d11342ec6541be26a865bab41a3_RequestInitiated') 
        async reviewStatusCombo_e3c41d11342ec6541be26a865bab41a3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}