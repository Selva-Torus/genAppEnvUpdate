import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAwaitingReviewController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AwaitingReview_c2755f26389c45489113bc4b047aec7c_RequestInitiated') 
        async AwaitingReview_c2755f26389c45489113bc4b047aec7c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}