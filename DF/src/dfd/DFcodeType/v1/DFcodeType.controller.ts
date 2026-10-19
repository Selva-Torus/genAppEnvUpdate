import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcodeTypeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('codeType_79f451f2e35f4b3589402dfe1a9278a2_RequestInitiated') 
        async codeType_79f451f2e35f4b3589402dfe1a9278a2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('codeType_987516858afb4e3eb3808a589b7dc335_RequestInitiated') 
        async codeType_987516858afb4e3eb3808a589b7dc335_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}