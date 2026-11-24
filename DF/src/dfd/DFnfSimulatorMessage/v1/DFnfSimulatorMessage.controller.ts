import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfSimulatorMessageController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfSimulatorMessage_97d3afaa43974639a1a9796e71d627a5_RequestInitiated') 
        async nfSimulatorMessage_97d3afaa43974639a1a9796e71d627a5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}