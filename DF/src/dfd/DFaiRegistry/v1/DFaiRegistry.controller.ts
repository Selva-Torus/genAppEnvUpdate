import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaiRegistryController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('aiRegistry_2f5d803350c74c4ba42f877f4ffe2008_RequestInitiated') 
        async aiRegistry_2f5d803350c74c4ba42f877f4ffe2008_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('aiRegistry_35e5f44737ed447099a5a4ba41ed5584_RequestInitiated') 
        async aiRegistry_35e5f44737ed447099a5a4ba41ed5584_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}