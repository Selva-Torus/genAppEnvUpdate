import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFamrChecklistStatusController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('amrChecklistStatus_401380fb5b984554a4210c053168c928_RequestInitiated') 
        async amrChecklistStatus_401380fb5b984554a4210c053168c928_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}