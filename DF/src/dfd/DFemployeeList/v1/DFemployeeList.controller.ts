import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFemployeeListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('employeeList_b81f68a6a98b42e782b124dd5a9c9e62_RequestInitiated') 
        async employeeList_b81f68a6a98b42e782b124dd5a9c9e62_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}