import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIModelTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIModelTable_d78756c73f084fe4aa1fc0d3e07f1cce_RequestInitiated') 
        async AIModelTable_d78756c73f084fe4aa1fc0d3e07f1cce_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}