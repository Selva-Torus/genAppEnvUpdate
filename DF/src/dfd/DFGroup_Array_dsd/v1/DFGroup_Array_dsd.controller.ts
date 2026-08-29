import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFGroup_Array_dsdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('Group_Array_dsd_1784d974130a42f7a665666f4bc53cbe_RequestInitiated') 
        async Group_Array_dsd_1784d974130a42f7a665666f4bc53cbe_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('Group_Array_dsd_de2bf16ff1b543958a63ec1f5fde63e7_RequestInitiated') 
        async Group_Array_dsd_de2bf16ff1b543958a63ec1f5fde63e7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}