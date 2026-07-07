import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcountry_code_dfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('country_code_dfd_02317a4900354a61a390a3ba4fff4fcb_RequestInitiated') 
        async country_code_dfd_02317a4900354a61a390a3ba4fff4fcb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('country_code_dfd_fa03cf6c52304be49484a558759f0ab2_RequestInitiated') 
        async country_code_dfd_fa03cf6c52304be49484a558759f0ab2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}