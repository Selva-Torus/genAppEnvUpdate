import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyCodeValueController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCodeValuesv1CT003PFPFDTAGTAGmodifyCodeValuev1_cdb2eaa2bfe44221b548c72fd8c3d176_6d18766e12704466bc2e67115e91f769111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCodeValuesv1CT003PFPFDTAGTAGmodifyCodeValuev1_cdb2eaa2bfe44221b548c72fd8c3d176_6d18766e12704466bc2e67115e91f769111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCodeValuev1_228a3df5b32a4baea74303ef6c2fc707_dan94y3h1bp0008f8j0g_updatedCompleted') 
        async CT003PFPFDTAGTAGmodifyCodeValuev1_228a3df5b32a4baea74303ef6c2fc707_dan94y3h1bp0008f8j0g_updatedCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyCodeValuev1_cf87a4bd72b44f89b3ec6eb6a0a977d5_damjtwvh1bp0008f5srg_updated') 
        async CT003PFPFDTAGTAGmodifyCodeValuev1_cf87a4bd72b44f89b3ec6eb6a0a977d5_damjtwvh1bp0008f5srg_updated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}