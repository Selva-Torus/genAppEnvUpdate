import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAICertificationTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AICertificationTable_d2ffecd5472844d189b76a340f14635f_RequestInitiated') 
        async AICertificationTable_d2ffecd5472844d189b76a340f14635f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}