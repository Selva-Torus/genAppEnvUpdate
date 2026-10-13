import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsNackFailureFileListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsNackFailureFileList_d254ab939238405b9eb12f6252663abc_RequestInitiated') 
        async wpsNackFailureFileList_d254ab939238405b9eb12f6252663abc_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}