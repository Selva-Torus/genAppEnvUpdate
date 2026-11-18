import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcrenditalsRefNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('crenditalsRefNameCombo_512911d4db751283ee181b8b444e3eb6_RequestInitiated') 
        async crenditalsRefNameCombo_512911d4db751283ee181b8b444e3eb6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}