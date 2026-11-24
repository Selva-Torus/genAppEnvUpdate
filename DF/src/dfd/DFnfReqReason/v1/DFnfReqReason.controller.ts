import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfReqReasonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfReqReason_26d58642b6794be19ff96c1aae533953_RequestInitiated') 
        async nfReqReason_26d58642b6794be19ff96c1aae533953_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}