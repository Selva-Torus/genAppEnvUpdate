import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetDashboardController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetDashboard_ee0de6ddc22146d1bdd7d5ee4cd55d0e_RequestInitiated') 
        async assetDashboard_ee0de6ddc22146d1bdd7d5ee4cd55d0e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assetDashboard_bfed081cd2b846d5b08424c7db441145_RequestInitiated') 
        async assetDashboard_bfed081cd2b846d5b08424c7db441145_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}