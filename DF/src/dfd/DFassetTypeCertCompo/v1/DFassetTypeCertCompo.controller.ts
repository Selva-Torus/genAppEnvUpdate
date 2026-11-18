import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetTypeCertCompoController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetTypeCertCompo_31b046bbba30434e9b261b0f863c73b8_RequestInitiated') 
        async assetTypeCertCompo_31b046bbba30434e9b261b0f863c73b8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}