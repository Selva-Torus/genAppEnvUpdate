import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaddAccessRequestModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('addAccessRequestModify_67817519792e451ea1c1495b3adaa78f_RequestInitiated') 
        async addAccessRequestModify_67817519792e451ea1c1495b3adaa78f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('addAccessRequestModify_21d269e30ee840848c3f8d33112a6ffd_RequestInitiated') 
        async addAccessRequestModify_21d269e30ee840848c3f8d33112a6ffd_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}