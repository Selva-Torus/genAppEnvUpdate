import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFskillJsonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('skillJson_f2a01cd22fda4fcdae3e61b66777a17d_RequestInitiated') 
        async skillJson_f2a01cd22fda4fcdae3e61b66777a17d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}