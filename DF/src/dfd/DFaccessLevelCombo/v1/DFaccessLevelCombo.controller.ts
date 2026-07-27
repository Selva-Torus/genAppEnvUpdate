import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaccessLevelComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('accessLevelCombo_832f443a30f690f2b0251572f7a8c938_RequestInitiated') 
        async accessLevelCombo_832f443a30f690f2b0251572f7a8c938_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}