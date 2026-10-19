import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcertificationConditionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('certificationCondition_85bc4a4042084701ac7551360aab3cda_RequestInitiated') 
        async certificationCondition_85bc4a4042084701ac7551360aab3cda_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('certificationCondition_cf6e23fda47e411fb45219772ac1a3e8_RequestInitiated') 
        async certificationCondition_cf6e23fda47e411fb45219772ac1a3e8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}