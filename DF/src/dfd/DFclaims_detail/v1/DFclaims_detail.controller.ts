import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaims_detailController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claims_detail_0aa1e64606d941eba6aa4d3de3db20ee_APIRequestInitiated') 
        async claims_detail_0aa1e64606d941eba6aa4d3de3db20ee_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claims_detail_c135d52beead4bd78db52f5d04e769c9_APIRequestCompleted') 
        async claims_detail_c135d52beead4bd78db52f5d04e769c9_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}