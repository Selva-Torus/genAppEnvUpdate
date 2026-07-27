import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFprovisioningStatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('provisioningStatusCombo_047f43e271da43aaabf0efa5bf9ae8ef_RequestInitiated') 
        async provisioningStatusCombo_047f43e271da43aaabf0efa5bf9ae8ef_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}