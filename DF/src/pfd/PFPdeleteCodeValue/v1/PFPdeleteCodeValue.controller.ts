import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdeleteCodeValueController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGdeleteCodeValuev1CT003PFPFDTAGTAGdeleteCodeValuev1_ffbe93aa7e754a328f52d3c4c0d576d7_2fc09080d5cf4e9bba81ed288137369c111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteCodeValuev1CT003PFPFDTAGTAGdeleteCodeValuev1_ffbe93aa7e754a328f52d3c4c0d576d7_2fc09080d5cf4e9bba81ed288137369c111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdeleteCodeValuev1_df73b83e742b4ccbb2d93d0402a8e2f9_damk7axh1bp0008f5z10_deleted') 
        async CT003PFPFDTAGTAGdeleteCodeValuev1_df73b83e742b4ccbb2d93d0402a8e2f9_damk7axh1bp0008f5z10_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}