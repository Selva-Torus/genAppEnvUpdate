import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFRegEmployerController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('RegEmployer_f9ca21efaa3815fc30670fee3b289ac9_RequestInitiated') 
        async RegEmployer_f9ca21efaa3815fc30670fee3b289ac9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}