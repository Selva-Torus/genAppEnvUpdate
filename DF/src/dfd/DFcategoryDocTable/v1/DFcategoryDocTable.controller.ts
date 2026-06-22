import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcategoryDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('categoryDocTable_48c4b1c6791435810a704a064e7a657b_RequestInitiated') 
        async categoryDocTable_48c4b1c6791435810a704a064e7a657b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}