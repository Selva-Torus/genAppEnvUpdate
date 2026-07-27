import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrequestPriorityComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('requestPriorityCombo_7e8dc83baddb25c1c54dc434097c4de5_RequestInitiated') 
        async requestPriorityCombo_7e8dc83baddb25c1c54dc434097c4de5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}