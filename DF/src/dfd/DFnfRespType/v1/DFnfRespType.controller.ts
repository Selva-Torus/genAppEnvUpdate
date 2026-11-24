import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfRespTypeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfRespType_6d7fa8a2e9b045a9969ca6ef764b439f_RequestInitiated') 
        async nfRespType_6d7fa8a2e9b045a9969ca6ef764b439f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}