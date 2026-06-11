import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFchannelComboSearchController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('channelComboSearch_830423a1acde493b97a7a73b1fcb3420_RequestInitiated') 
        async channelComboSearch_830423a1acde493b97a7a73b1fcb3420_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}