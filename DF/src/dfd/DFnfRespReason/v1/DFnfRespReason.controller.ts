import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfRespReasonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfRespReason_61eb37ce90c649dead04b07c23d60f38_RequestInitiated') 
        async nfRespReason_61eb37ce90c649dead04b07c23d60f38_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}