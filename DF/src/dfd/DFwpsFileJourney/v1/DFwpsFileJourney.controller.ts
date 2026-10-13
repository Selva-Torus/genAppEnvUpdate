import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsFileJourneyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsFileJourney_f86c8becb6a24eaea7e70c1f8fe2c3dc_RequestInitiated') 
        async wpsFileJourney_f86c8becb6a24eaea7e70c1f8fe2c3dc_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}