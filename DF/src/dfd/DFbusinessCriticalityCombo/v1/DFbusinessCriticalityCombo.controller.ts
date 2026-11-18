import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbusinessCriticalityComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('businessCriticalityCombo_8107203c57ee00c4aafeedafc7da2172_RequestInitiated') 
        async businessCriticalityCombo_8107203c57ee00c4aafeedafc7da2172_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}