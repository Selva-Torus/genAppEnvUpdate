import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcertificationStagesTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('certificationStagesTable_b73ad95ed3798b7d3d7ee1c9087794ec_RequestInitiated') 
        async certificationStagesTable_b73ad95ed3798b7d3d7ee1c9087794ec_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}