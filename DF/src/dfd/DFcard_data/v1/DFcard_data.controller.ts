import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcard_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('card_data_290c2fa176b24577892916cc29e6eee5_DBRequestInitiated') 
        async card_data_290c2fa176b24577892916cc29e6eee5_DBRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('card_data_a7caf71c572343c08c193b078fe675b3_DBRequestCompleted') 
        async card_data_a7caf71c572343c08c193b078fe675b3_DBRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}