import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFPossibleDuplicatesCardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('PossibleDuplicatesCard_c382babe239e4fd48262237581c2bf95_RequestInitiated') 
        async PossibleDuplicatesCard_c382babe239e4fd48262237581c2bf95_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}