import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaddPerformanceReviewModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('addPerformanceReviewModify_aa603b56a39dee50a1f25f8244fdbf53_RequestInitiated') 
        async addPerformanceReviewModify_aa603b56a39dee50a1f25f8244fdbf53_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('addPerformanceReviewModify_b03841acebc5e140e2200403d00450fe_RequestInitiated') 
        async addPerformanceReviewModify_b03841acebc5e140e2200403d00450fe_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}