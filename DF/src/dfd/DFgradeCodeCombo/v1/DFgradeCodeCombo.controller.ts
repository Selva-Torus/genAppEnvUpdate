import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFgradeCodeComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('gradeCodeCombo_0b75398dec3e4cdab9d024da92009338_RequestInitiated') 
        async gradeCodeCombo_0b75398dec3e4cdab9d024da92009338_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}