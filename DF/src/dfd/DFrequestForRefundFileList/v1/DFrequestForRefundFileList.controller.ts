import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrequestForRefundFileListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('requestForRefundFileList_0343596ec4e84e042db2e977cf8891ed_RequestInitiated') 
        async requestForRefundFileList_0343596ec4e84e042db2e977cf8891ed_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}