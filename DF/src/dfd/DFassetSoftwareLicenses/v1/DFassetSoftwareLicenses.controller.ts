import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetSoftwareLicensesController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetSoftwareLicenses_cbcb991859be4adb87acfe54752c7154_RequestInitiated') 
        async assetSoftwareLicenses_cbcb991859be4adb87acfe54752c7154_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assetSoftwareLicenses_a1f54b62a6e841a3810307b90725a55a_RequestInitiated') 
        async assetSoftwareLicenses_a1f54b62a6e841a3810307b90725a55a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}