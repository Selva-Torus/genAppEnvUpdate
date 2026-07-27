import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFgenderComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('genderCombo_9ca43f872d5d4554bbd5108074c3c1b5_RequestInitiated') 
        async genderCombo_9ca43f872d5d4554bbd5108074c3c1b5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}