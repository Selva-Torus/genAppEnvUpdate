import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFmodelFamilyComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('modelFamilyCombo_51fbb0813c68b1b1248a3223de4a8ac6_RequestInitiated') 
        async modelFamilyCombo_51fbb0813c68b1b1248a3223de4a8ac6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}