import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFauthorityGrantController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('authorityGrant_6e50e09938834ce3bd0789f0d56b8f57_RequestInitiated') 
        async authorityGrant_6e50e09938834ce3bd0789f0d56b8f57_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('authorityGrant_afb5b154f0054e88ac5cf9a8e577864d_RequestInitiated') 
        async authorityGrant_afb5b154f0054e88ac5cf9a8e577864d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}