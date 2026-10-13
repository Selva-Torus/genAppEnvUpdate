import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreturnFromAgentFileListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('returnFromAgentFileList_6fca90b517814a0a8a2c9120db43e6f5_RequestInitiated') 
        async returnFromAgentFileList_6fca90b517814a0a8a2c9120db43e6f5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}