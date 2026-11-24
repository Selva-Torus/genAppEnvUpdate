import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfReqTypeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfReqType_b04adad834684332ba72060e66f488a5_RequestInitiated') 
        async nfReqType_b04adad834684332ba72060e66f488a5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}