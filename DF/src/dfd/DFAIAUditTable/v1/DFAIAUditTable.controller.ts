import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIAUditTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIAUditTable_b5d334ff1bc24c60b681560cb36ea87c_RequestInitiated') 
        async AIAUditTable_b5d334ff1bc24c60b681560cb36ea87c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}