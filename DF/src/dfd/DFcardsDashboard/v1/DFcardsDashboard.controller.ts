import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcardsDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('cardsDashboard_47ece97d6bc84a0a820999640b347351_RequestInitiated') 
        async cardsDashboard_47ece97d6bc84a0a820999640b347351_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}