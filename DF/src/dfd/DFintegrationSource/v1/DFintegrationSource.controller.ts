import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFintegrationSourceController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('integrationSource_c9e7796d969f4f1daa6cc1f3f03d3337_RequestInitiated') 
        async integrationSource_c9e7796d969f4f1daa6cc1f3f03d3337_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('integrationSource_00451184fbfc4a2b8af19d45b97c9512_RequestInitiated') 
        async integrationSource_00451184fbfc4a2b8af19d45b97c9512_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}