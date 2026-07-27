import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFperformanceReviewDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('performanceReviewDocTable_f1ddf317bb813089cd54e5ee731b0655_RequestInitiated') 
        async performanceReviewDocTable_f1ddf317bb813089cd54e5ee731b0655_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}