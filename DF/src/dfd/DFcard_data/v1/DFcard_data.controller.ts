import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcard_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('card_data_7e8854a825ff4882a7eea1f6ad00bae5_RequestInitiated') 
        async card_data_7e8854a825ff4882a7eea1f6ad00bae5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('card_data_a7caf71c572343c08c193b078fe675b3_RequestInitiated') 
        async card_data_a7caf71c572343c08c193b078fe675b3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}