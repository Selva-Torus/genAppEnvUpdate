import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIAssetDependencyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIAssetDependency_88e728cba01706e29db843b9ac621181_RequestInitiated') 
        async AIAssetDependency_88e728cba01706e29db843b9ac621181_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}