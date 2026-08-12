import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFreportCaseController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('reportCase_2eb472ecc0ac4947b152a5b8048af84f_RequestInitiated') 
        async reportCase_2eb472ecc0ac4947b152a5b8048af84f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('reportCase_4a33e365d6e64576a23ff761aa19bdab_RequestInitiated') 
        async reportCase_4a33e365d6e64576a23ff761aa19bdab_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}