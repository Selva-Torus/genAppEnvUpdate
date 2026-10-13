import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtranJourneyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('tranJourney_417be61b10d94087a2fd0d1c670abf33_RequestInitiated') 
        async tranJourney_417be61b10d94087a2fd0d1c670abf33_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}