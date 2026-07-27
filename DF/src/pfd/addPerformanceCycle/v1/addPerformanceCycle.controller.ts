import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addPerformanceCycleController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewPerformanceCyclev1CT006PFPFDECPHRMaddPerformanceCyclev1_ab7f07e0ea0bf53acfde4b7206e22ce1_9f10b605aa789e216d34052db9e002ef111_RequestInitiated') 
        async CT006UFUFWECPHRMnewPerformanceCyclev1CT006PFPFDECPHRMaddPerformanceCyclev1_ab7f07e0ea0bf53acfde4b7206e22ce1_9f10b605aa789e216d34052db9e002ef111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceCyclev1_99ca303d4618d610c4a6d806d268b764_d2391d9739504685bf724f5d99429b88_RequestCompleted') 
        async CT006PFPFDECPHRMaddPerformanceCyclev1_99ca303d4618d610c4a6d806d268b764_d2391d9739504685bf724f5d99429b88_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}