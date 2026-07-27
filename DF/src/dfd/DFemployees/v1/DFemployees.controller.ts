import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFemployeesController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('employees_4aa91b9312404db6af0023c28a9e879b_RequestInitiated') 
        async employees_4aa91b9312404db6af0023c28a9e879b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('employees_73c2a20a785b4361a729fb7c45a12258_RequestInitiated') 
        async employees_73c2a20a785b4361a729fb7c45a12258_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}