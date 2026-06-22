import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFsoftwareDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('softwareDocTable_f5167bb22af252cf69d95c4613936d43_RequestInitiated') 
        async softwareDocTable_f5167bb22af252cf69d95c4613936d43_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}