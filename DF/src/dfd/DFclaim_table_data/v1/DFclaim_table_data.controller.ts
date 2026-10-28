import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaim_table_dataController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claim_table_data_df4b14141b294aa2bf4cde24461cc4f5_RequestInitiated') 
        async claim_table_data_df4b14141b294aa2bf4cde24461cc4f5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claim_table_data_bc094f2d2b914ccfaeed3d2a293a01fe_RequestInitiated') 
        async claim_table_data_bc094f2d2b914ccfaeed3d2a293a01fe_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}