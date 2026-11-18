import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtierAssessmentController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('tierAssessment_c7bd520305a445b2ba3e3577f0f158f8_RequestInitiated') 
        async tierAssessment_c7bd520305a445b2ba3e3577f0f158f8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('tierAssessment_f5f3ab7e0e534ce18adce088c62a87c9_RequestInitiated') 
        async tierAssessment_f5f3ab7e0e534ce18adce088c62a87c9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}