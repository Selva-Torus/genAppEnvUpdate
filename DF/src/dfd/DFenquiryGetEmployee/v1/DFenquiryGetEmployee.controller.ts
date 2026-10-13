import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFenquiryGetEmployeeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('enquiryGetEmployee_0e38a8c1efcf449099d6a85146d84098_RequestInitiated') 
        async enquiryGetEmployee_0e38a8c1efcf449099d6a85146d84098_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}