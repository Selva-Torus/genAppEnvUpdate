import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaddBackgroundCheckModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('addBackgroundCheckModify_768dc0d284c5fd898b06fbf96c048191_RequestInitiated') 
        async addBackgroundCheckModify_768dc0d284c5fd898b06fbf96c048191_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('addBackgroundCheckModify_0360d19ce049ee6d026d06b6e2f7f1bb_RequestInitiated') 
        async addBackgroundCheckModify_0360d19ce049ee6d026d06b6e2f7f1bb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}