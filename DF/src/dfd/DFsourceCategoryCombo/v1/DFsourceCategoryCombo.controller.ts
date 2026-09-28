import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFsourceCategoryComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('sourceCategoryCombo_65d9609d6d5a446280bd117ec9c6a9ac_RequestInitiated') 
        async sourceCategoryCombo_65d9609d6d5a446280bd117ec9c6a9ac_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}