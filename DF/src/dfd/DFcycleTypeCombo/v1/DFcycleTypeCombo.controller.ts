import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcycleTypeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('cycleTypeCombo_31351262bfd357a37e563784ae658077_RequestInitiated') 
        async cycleTypeCombo_31351262bfd357a37e563784ae658077_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}