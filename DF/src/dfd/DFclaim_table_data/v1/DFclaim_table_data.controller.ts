import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaim_table_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claim_table_data_90efd4ec8903421aaac09bfb5c3e3512_DBRequestInitiated') 
        async claim_table_data_90efd4ec8903421aaac09bfb5c3e3512_DBRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claim_table_data_bc094f2d2b914ccfaeed3d2a293a01fe_DBRequestCompleted') 
        async claim_table_data_bc094f2d2b914ccfaeed3d2a293a01fe_DBRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}