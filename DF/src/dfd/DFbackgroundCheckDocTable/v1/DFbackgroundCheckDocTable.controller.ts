import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbackgroundCheckDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('backgroundCheckDocTable_4173981b5ab3fa9e4dc1d2ac4c1d5977_RequestInitiated') 
        async backgroundCheckDocTable_4173981b5ab3fa9e4dc1d2ac4c1d5977_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}