import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFeducationJsonController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('educationJson_172c23b4894e4d33a2784d2bd3e0c409_RequestInitiated') 
        async educationJson_172c23b4894e4d33a2784d2bd3e0c409_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}