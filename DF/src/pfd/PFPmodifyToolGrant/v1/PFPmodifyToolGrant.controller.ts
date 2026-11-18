import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyToolGrantController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_9b4def282e4fb0b5f4ea73f0b5e1357c111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_9b4def282e4fb0b5f4ea73f0b5e1357c111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_58f9321be583fdbd966a83263f8beefc111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_58f9321be583fdbd966a83263f8beefc111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGapproveToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_87d820ea7fe9f61a2853f134e56a001a111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGapproveToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_87d820ea7fe9f61a2853f134e56a001a111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGapproveToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_4ce7582b6cb485b422c95d7ef06048e6111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGapproveToolGrantv1CT003PFPFDTAGTAGmodifyToolGrantv1_5584a4470877a71098b3a2d301c8ec5c_4ce7582b6cb485b422c95d7ef06048e6111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyToolGrantv1_bb9a4f28f389ffe5d5a53d7527e15b54_dbpt8ktg5z8g008c63c0_dec_update_or_delete_initiated') 
        async CT003PFPFDTAGTAGmodifyToolGrantv1_bb9a4f28f389ffe5d5a53d7527e15b54_dbpt8ktg5z8g008c63c0_dec_update_or_delete_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyToolGrantv1_52dd07782ed1cdefb479b7fe51a54fd4_dbpt8ktg5z8g008c63cg_toolGrant_updated') 
        async CT003PFPFDTAGTAGmodifyToolGrantv1_52dd07782ed1cdefb479b7fe51a54fd4_dbpt8ktg5z8g008c63cg_toolGrant_updated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyToolGrantv1_b02c3949621fb78dc639eabf6fb0cc03_dbpt8ktg5z8g008c63d0_toolGranted_deleted') 
        async CT003PFPFDTAGTAGmodifyToolGrantv1_b02c3949621fb78dc639eabf6fb0cc03_dbpt8ktg5z8g008c63d0_toolGranted_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyToolGrantv1_716b9fe174a3456cb4784a8b67cd01b3_dbsas6cg5z8g008c6sv0_Approve') 
        async CT003PFPFDTAGTAGmodifyToolGrantv1_716b9fe174a3456cb4784a8b67cd01b3_dbsas6cg5z8g008c6sv0_Approve(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyToolGrantv1_8140bfc1be4541b9a84cc66324c9a8c8_dbsas7cg5z8g008c6t7g_Reject') 
        async CT003PFPFDTAGTAGmodifyToolGrantv1_8140bfc1be4541b9a84cc66324c9a8c8_dbsas7cg5z8g008c6t7g_Reject(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}