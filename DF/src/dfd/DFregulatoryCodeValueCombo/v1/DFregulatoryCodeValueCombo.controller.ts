import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFregulatoryCodeValueComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('regulatoryCodeValueCombo_51a645ff66b04b71af2854ee046bbf03_RequestInitiated') 
        async regulatoryCodeValueCombo_51a645ff66b04b71af2854ee046bbf03_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}