import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdiscoverySourceController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('discoverySource_1a92670c9392959cc08de53d253453d3_RequestInitiated') 
        async discoverySource_1a92670c9392959cc08de53d253453d3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}