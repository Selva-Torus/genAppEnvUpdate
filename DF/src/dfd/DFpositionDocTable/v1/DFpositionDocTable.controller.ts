import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpositionDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('positionDocTable_b2a9f425d7df4b2faccb251ea2e1defb_RequestInitiated') 
        async positionDocTable_b2a9f425d7df4b2faccb251ea2e1defb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}