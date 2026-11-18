import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcertificationStageController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('certificationStage_cba89579067f49a38d389f1097969444_RequestInitiated') 
        async certificationStage_cba89579067f49a38d389f1097969444_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('certificationStage_88bfa10bae244d46834703dc5570ae04_RequestInitiated') 
        async certificationStage_88bfa10bae244d46834703dc5570ae04_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}