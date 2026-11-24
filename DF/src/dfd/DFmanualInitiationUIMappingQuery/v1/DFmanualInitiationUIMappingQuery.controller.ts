import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFmanualInitiationUIMappingQueryController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('manualInitiationUIMappingQuery_397522371992474f978940d3a1927219_RequestInitiated') 
        async manualInitiationUIMappingQuery_397522371992474f978940d3a1927219_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}