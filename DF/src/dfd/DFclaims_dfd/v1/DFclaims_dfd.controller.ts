import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaims_dfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claims_dfd_1143fba1b035410d80b91c8996ee6d3a_RequestInitiated') 
        async claims_dfd_1143fba1b035410d80b91c8996ee6d3a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claims_dfd_9a6fc4f57c4a4af5b4b9cf040f73876e_RequestInitiated') 
        async claims_dfd_9a6fc4f57c4a4af5b4b9cf040f73876e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}