import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcertificationTemplateComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('certificationTemplateCombo_f7d648c10d1848ab8721bb6b05df34bf_RequestInitiated') 
        async certificationTemplateCombo_f7d648c10d1848ab8721bb6b05df34bf_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}