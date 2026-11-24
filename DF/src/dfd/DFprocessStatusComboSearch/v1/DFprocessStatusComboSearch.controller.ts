import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFprocessStatusComboSearchController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('processStatusComboSearch_5ba75564f2a74f45815386a653da526d_RequestInitiated') 
        async processStatusComboSearch_5ba75564f2a74f45815386a653da526d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}