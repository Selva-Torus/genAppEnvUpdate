import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetMaintenanceController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetMaintenance_cc71ed895da0472891e2ead4ec3339cb_RequestInitiated') 
        async assetMaintenance_cc71ed895da0472891e2ead4ec3339cb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assetMaintenance_a3386808f53949eebff60bf867dcc7a3_RequestInitiated') 
        async assetMaintenance_a3386808f53949eebff60bf867dcc7a3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}