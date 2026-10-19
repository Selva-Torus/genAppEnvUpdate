import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFmodelDetailsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('modelDetails_0fc9a2e23da1781241e48e3cfea54f49_RequestInitiated') 
        async modelDetails_0fc9a2e23da1781241e48e3cfea54f49_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('modelDetails_5992566f679220465270cc1d9b3d1122_RequestInitiated') 
        async modelDetails_5992566f679220465270cc1d9b3d1122_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}