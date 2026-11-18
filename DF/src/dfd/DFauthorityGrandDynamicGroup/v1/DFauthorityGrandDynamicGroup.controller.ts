import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFauthorityGrandDynamicGroupController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('authorityGrandDynamicGroup_e16eff97e543300d1789dc556fa8e2b6_RequestInitiated') 
        async authorityGrandDynamicGroup_e16eff97e543300d1789dc556fa8e2b6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}