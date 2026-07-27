import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFjobPositionsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('jobPositions_56a36d9278a543919511286dd2aafbe3_RequestInitiated') 
        async jobPositions_56a36d9278a543919511286dd2aafbe3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('jobPositions_ffc1d63fd7a3455d8438315430a6dcce_RequestInitiated') 
        async jobPositions_ffc1d63fd7a3455d8438315430a6dcce_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}