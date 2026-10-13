import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFsfJourneyViewTransactionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('sfJourneyViewTransaction_a8cdcdfebeffb9c4b3f76b85b9054b7c_RequestInitiated') 
        async sfJourneyViewTransaction_a8cdcdfebeffb9c4b3f76b85b9054b7c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}