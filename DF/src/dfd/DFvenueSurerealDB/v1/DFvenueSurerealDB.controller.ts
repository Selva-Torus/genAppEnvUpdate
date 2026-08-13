import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFvenueSurerealDBController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('venueSurerealDB_cfc5fdc80b5b46dc9bf5a74352f92d52_RequestInitiated') 
        async venueSurerealDB_cfc5fdc80b5b46dc9bf5a74352f92d52_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}