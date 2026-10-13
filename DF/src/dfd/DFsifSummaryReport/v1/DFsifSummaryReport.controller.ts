import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFsifSummaryReportController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('sifSummaryReport_57289de7c9cf02b5aa94e03a73f7f12b_RequestInitiated') 
        async sifSummaryReport_57289de7c9cf02b5aa94e03a73f7f12b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}