import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFadvance_searchController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('advance_search_564d8047998f4a88972856f425580453_RequestInitiated') 
        async advance_search_564d8047998f4a88972856f425580453_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('advance_search_f46bdd6636f04d06acd608adb3ca2db3_RequestInitiated') 
        async advance_search_f46bdd6636f04d06acd608adb3ca2db3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}