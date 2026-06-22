import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assets_511a7b5771be4cb69a460c089591fdd9_RequestInitiated') 
        async assets_511a7b5771be4cb69a460c089591fdd9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assets_19752269565d4be2be63be1bd8cf4ff6_RequestInitiated') 
        async assets_19752269565d4be2be63be1bd8cf4ff6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}