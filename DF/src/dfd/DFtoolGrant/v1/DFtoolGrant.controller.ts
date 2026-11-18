import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtoolGrantController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('toolGrant_96b5e4ba6f7b49dbb865de476747f3fe_RequestInitiated') 
        async toolGrant_96b5e4ba6f7b49dbb865de476747f3fe_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('toolGrant_a207da708e574413a60aaba5e006f4dd_RequestInitiated') 
        async toolGrant_a207da708e574413a60aaba5e006f4dd_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}