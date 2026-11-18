import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFkillSwitchActionListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('killSwitchActionList_96a81a6310c537fbb83155d6acbd43a4_RequestInitiated') 
        async killSwitchActionList_96a81a6310c537fbb83155d6acbd43a4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}