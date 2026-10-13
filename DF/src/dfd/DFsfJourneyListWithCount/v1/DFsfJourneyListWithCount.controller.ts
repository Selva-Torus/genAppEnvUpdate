import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFsfJourneyListWithCountController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('sfJourneyListWithCount_37196479c5274a68b0bd150caad67de2_RequestInitiated') 
        async sfJourneyListWithCount_37196479c5274a68b0bd150caad67de2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}