import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetCategoryCardsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetCategoryCards_0eb247a5818f45d3aad9d1d143bcc323_RequestInitiated') 
        async assetCategoryCards_0eb247a5818f45d3aad9d1d143bcc323_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}