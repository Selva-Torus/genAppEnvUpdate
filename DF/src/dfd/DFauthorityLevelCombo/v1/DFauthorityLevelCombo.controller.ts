import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFauthorityLevelComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('authorityLevelCombo_79d960b5854947f98de8f625654013fa_RequestInitiated') 
        async authorityLevelCombo_79d960b5854947f98de8f625654013fa_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}