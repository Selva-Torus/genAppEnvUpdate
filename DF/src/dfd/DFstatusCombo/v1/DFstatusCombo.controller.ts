import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFstatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('statusCombo_5738a6939a5d0de499e67c87705acc48_RequestInitiated') 
        async statusCombo_5738a6939a5d0de499e67c87705acc48_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}