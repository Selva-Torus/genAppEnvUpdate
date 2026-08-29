import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFset_whereController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('set_where_477b9769d83a4ad5b7e1883c8c89a92f_RequestInitiated') 
        async set_where_477b9769d83a4ad5b7e1883c8c89a92f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('set_where_54c553a9dce24eccad9519349b15fe53_RequestInitiated') 
        async set_where_54c553a9dce24eccad9519349b15fe53_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}