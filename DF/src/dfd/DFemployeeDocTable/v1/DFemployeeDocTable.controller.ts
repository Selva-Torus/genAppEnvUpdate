import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFemployeeDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('employeeDocTable_27c1bbd647684532a08851f39d5b83f0_RequestInitiated') 
        async employeeDocTable_27c1bbd647684532a08851f39d5b83f0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}