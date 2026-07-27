import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFfamilyJsonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('familyJson_c4aa677c03bb47c88fbb0a7f37a48045_RequestInitiated') 
        async familyJson_c4aa677c03bb47c88fbb0a7f37a48045_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}