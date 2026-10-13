import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpifSummaryReportController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('pifSummaryReport_7c6ab9d8d6e497d0d95ca79077e72255_RequestInitiated') 
        async pifSummaryReport_7c6ab9d8d6e497d0d95ca79077e72255_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}