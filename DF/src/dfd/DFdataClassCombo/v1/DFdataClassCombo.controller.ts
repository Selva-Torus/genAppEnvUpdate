import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdataClassComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('dataClassCombo_6046b2f70e84ace68799a2d189849fbe_RequestInitiated') 
        async dataClassCombo_6046b2f70e84ace68799a2d189849fbe_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}