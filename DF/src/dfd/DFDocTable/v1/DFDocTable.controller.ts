import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('DocTable_63f1fdf16ab179720c3d1503d94e26de_RequestInitiated') 
        async DocTable_63f1fdf16ab179720c3d1503d94e26de_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}