import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFfieldMapComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('fieldMapCombo_6c3225ff700a03a0d7f12f5752d1e133_RequestInitiated') 
        async fieldMapCombo_6c3225ff700a03a0d7f12f5752d1e133_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}