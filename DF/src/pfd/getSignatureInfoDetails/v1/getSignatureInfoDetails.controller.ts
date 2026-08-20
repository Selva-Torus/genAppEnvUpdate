import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class getSignatureInfoDetailsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT005UFUFWGSSRTGSscanSaveProcessUiv1CT005PFPFDGSSRTGSgetSignatureInfoDetailsv1_86323853cb1147e4a05c141e0d1ac7c0_13296ded9e0e4d45b1456729e6d3ad2e1112_apinode_triggered') 
        async CT005UFUFWGSSRTGSscanSaveProcessUiv1CT005PFPFDGSSRTGSgetSignatureInfoDetailsv1_86323853cb1147e4a05c141e0d1ac7c0_13296ded9e0e4d45b1456729e6d3ad2e1112_apinode_triggered(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSgetSignatureInfoDetailsv1_27ac6b118bad4eacbae292b8e78bc344_d9c6szfgg2r00088zch0_apinode_initiated') 
        async CT005PFPFDGSSRTGSgetSignatureInfoDetailsv1_27ac6b118bad4eacbae292b8e78bc344_d9c6szfgg2r00088zch0_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSgetSignatureInfoDetailsv1_5ef5445aa42240bc9be5a22320a71050_d9c6szfgg2r00088zchg_outputnode_initiated') 
        async CT005PFPFDGSSRTGSgetSignatureInfoDetailsv1_5ef5445aa42240bc9be5a22320a71050_d9c6szfgg2r00088zchg_outputnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}