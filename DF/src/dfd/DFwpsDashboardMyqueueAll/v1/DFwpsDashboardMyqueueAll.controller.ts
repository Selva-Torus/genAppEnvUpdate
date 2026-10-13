import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardMyqueueAllController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardMyqueueAll_e084a0ef7bbf443792cd1afb7e10163b_RequestInitiated') 
        async wpsDashboardMyqueueAll_e084a0ef7bbf443792cd1afb7e10163b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}