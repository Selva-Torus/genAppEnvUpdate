import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFintegrationFieldMapController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('integrationFieldMap_351bf95f56af41f091f1c61a38ecfb45_RequestInitiated') 
        async integrationFieldMap_351bf95f56af41f091f1c61a38ecfb45_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}