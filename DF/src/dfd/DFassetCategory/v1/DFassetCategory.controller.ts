import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetCategoryController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetCategory_e28f74d0cab849139839b99ae335284c_RequestInitiated') 
        async assetCategory_e28f74d0cab849139839b99ae335284c_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assetCategory_22ba40e3f56441559478608632cef203_RequestInitiated') 
        async assetCategory_22ba40e3f56441559478608632cef203_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}