import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFgradeDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('gradeDocTable_9f6baf6395484208bd05af0c94acef26_RequestInitiated') 
        async gradeDocTable_9f6baf6395484208bd05af0c94acef26_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}