import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpostingExceptionProcessListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('postingExceptionProcessList_5fc93656374642398a62f153391ab399_RequestInitiated') 
        async postingExceptionProcessList_5fc93656374642398a62f153391ab399_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}