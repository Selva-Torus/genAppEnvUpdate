import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFjobGradeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('jobGrade_adad628e815f446fa7f9d18477d5830e_RequestInitiated') 
        async jobGrade_adad628e815f446fa7f9d18477d5830e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('jobGrade_c496957cdcf54d02b06872f0f45f2a70_RequestInitiated') 
        async jobGrade_c496957cdcf54d02b06872f0f45f2a70_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}