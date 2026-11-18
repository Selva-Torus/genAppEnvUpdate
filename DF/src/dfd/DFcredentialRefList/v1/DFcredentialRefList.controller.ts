import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcredentialRefListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('credentialRefList_b325a58da2ecafb91800d7c2f555dd61_RequestInitiated') 
        async credentialRefList_b325a58da2ecafb91800d7c2f555dd61_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}