import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFhostingRegionComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('hostingRegionCombo_96dd39aad4764576b42d50016776ef84_RequestInitiated') 
        async hostingRegionCombo_96dd39aad4764576b42d50016776ef84_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}