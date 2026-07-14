import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFuserdfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('userdfd_9afa492b0cb145cfaf8c74ce82116ae8_RequestInitiated') 
        async userdfd_9afa492b0cb145cfaf8c74ce82116ae8_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}