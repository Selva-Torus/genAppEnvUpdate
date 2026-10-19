import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAssetListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AssetList_bfc2446700656ab33c91f768e93ca579_RequestInitiated') 
        async AssetList_bfc2446700656ab33c91f768e93ca579_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}