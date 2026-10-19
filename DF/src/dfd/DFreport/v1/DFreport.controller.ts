import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreportController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('report_a7901b81163e4be0aac4cf0f22111f75_RequestInitiated') 
        async report_a7901b81163e4be0aac4cf0f22111f75_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('report_12e36ada1d144f79a6ec976e198d28a8_RequestInitiated') 
        async report_12e36ada1d144f79a6ec976e198d28a8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}