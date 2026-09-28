import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrecentEvidencePackTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('recentEvidencePackTable_83d7d1fa31b78229ac226571e984b272_RequestInitiated') 
        async recentEvidencePackTable_83d7d1fa31b78229ac226571e984b272_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}