import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFvenueSpecialRulesController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('venueSpecialRules_eed1b90543e747829ff96af5df90bdcd_RequestInitiated') 
        async venueSpecialRules_eed1b90543e747829ff96af5df90bdcd_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}