import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaccessReqDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('accessReqDocTable_87fe7772998938b7b7610a04ffd9c4a8_RequestInitiated') 
        async accessReqDocTable_87fe7772998938b7b7610a04ffd9c4a8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}