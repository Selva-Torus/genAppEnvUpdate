import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreturnReasonDfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('returnReasonDfd_3ce567bf02174372962095686e0080ad_RequestInitiated') 
        async returnReasonDfd_3ce567bf02174372962095686e0080ad_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}