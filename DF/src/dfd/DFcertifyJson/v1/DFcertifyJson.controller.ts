import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcertifyJsonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('certifyJson_dcf2ab0ce86249d59782805341cb8b09_RequestInitiated') 
        async certifyJson_dcf2ab0ce86249d59782805341cb8b09_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}