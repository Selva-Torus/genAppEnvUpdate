import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaims_detailController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claims_detail_3bda0623104c4465be7063cc604b312a_RequestInitiated') 
        async claims_detail_3bda0623104c4465be7063cc604b312a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claims_detail_c135d52beead4bd78db52f5d04e769c9_RequestInitiated') 
        async claims_detail_c135d52beead4bd78db52f5d04e769c9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}