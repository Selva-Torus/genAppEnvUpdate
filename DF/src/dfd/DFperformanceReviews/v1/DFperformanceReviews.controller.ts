import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFperformanceReviewsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('performanceReviews_854e638c286690328ade35038b7cdd75_RequestInitiated') 
        async performanceReviews_854e638c286690328ade35038b7cdd75_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('performanceReviews_c36a10740c3daa09b9145172fb2c417d_RequestInitiated') 
        async performanceReviews_c36a10740c3daa09b9145172fb2c417d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}