import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class addPerformanceCycleModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT006UFUFWECPHRMnewPerformanceCyclev1CT006PFPFDECPHRMaddPerformanceCycleModifyv1_f6b3a6d6e9d31efa79a6fbb3fc9fa214_cfa26e365fcf0fba487e19fa7cdefceb111_RequestInitiated') 
        async CT006UFUFWECPHRMnewPerformanceCyclev1CT006PFPFDECPHRMaddPerformanceCycleModifyv1_f6b3a6d6e9d31efa79a6fbb3fc9fa214_cfa26e365fcf0fba487e19fa7cdefceb111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006UFUFWECPHRMperformanceCyclesDeletev1CT006PFPFDECPHRMaddPerformanceCycleModifyv1_f6b3a6d6e9d31efa79a6fbb3fc9fa214_cfedf40528d4ba5b7e1c0c4b4e424d12111_RequestInitiated') 
        async CT006UFUFWECPHRMperformanceCyclesDeletev1CT006PFPFDECPHRMaddPerformanceCycleModifyv1_f6b3a6d6e9d31efa79a6fbb3fc9fa214_cfedf40528d4ba5b7e1c0c4b4e424d12111_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceCycleModifyv1_49dc7f44c8ea360c38bfca6cc4c976fc_3dcc93fe627346298910fe35f9bea0b5_RequestCompleted') 
        async CT006PFPFDECPHRMaddPerformanceCycleModifyv1_49dc7f44c8ea360c38bfca6cc4c976fc_3dcc93fe627346298910fe35f9bea0b5_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceCycleModifyv1_c1e6313329df6580b725e129d0fd1708_b738a99ffceb4b208fd75cf6e9c17046_Cycle_Modified') 
        async CT006PFPFDECPHRMaddPerformanceCycleModifyv1_c1e6313329df6580b725e129d0fd1708_b738a99ffceb4b208fd75cf6e9c17046_Cycle_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT006PFPFDECPHRMaddPerformanceCycleModifyv1_2083021053d665ca61b9f514e9b58863_c50697485d2447a5b633113144a17648_Cycle_Deleted') 
        async CT006PFPFDECPHRMaddPerformanceCycleModifyv1_2083021053d665ca61b9f514e9b58863_c50697485d2447a5b633113144a17648_Cycle_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}