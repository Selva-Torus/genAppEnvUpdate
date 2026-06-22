import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetDocTable_6b0f8053003c4fd2bf449ff8a70461f3_RequestInitiated') 
        async assetDocTable_6b0f8053003c4fd2bf449ff8a70461f3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}