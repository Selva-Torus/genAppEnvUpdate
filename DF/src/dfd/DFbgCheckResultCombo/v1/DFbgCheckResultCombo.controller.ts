import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbgCheckResultComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('bgCheckResultCombo_58fb144d39541b014f8ff8f8c0e2c22d_RequestInitiated') 
        async bgCheckResultCombo_58fb144d39541b014f8ff8f8c0e2c22d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}