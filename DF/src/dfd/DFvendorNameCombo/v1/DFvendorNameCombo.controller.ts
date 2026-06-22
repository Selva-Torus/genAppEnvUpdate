import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFvendorNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('vendorNameCombo_a524a93a52344d4e9c64a7461e1be129_RequestInitiated') 
        async vendorNameCombo_a524a93a52344d4e9c64a7461e1be129_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}