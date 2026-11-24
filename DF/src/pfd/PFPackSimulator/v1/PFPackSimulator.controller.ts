import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPackSimulatorController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_a9446c3586ba41ed9fb18f1cc7ba4ae6111_HT_SOURCE') 
        async CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_a9446c3586ba41ed9fb18f1cc7ba4ae6111_HT_SOURCE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_114f53128e2e48b7a8320c954fae9bd8111_HT_Status') 
        async CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_114f53128e2e48b7a8320c954fae9bd8111_HT_Status(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_c3dad7f7054246d5b8e14fe305c08cbe111_HT_SOURCE') 
        async CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_c3dad7f7054246d5b8e14fe305c08cbe111_HT_SOURCE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_6e1d813e6c2949debae9f684ff93f88e111_HT_SOURCE') 
        async CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_6e1d813e6c2949debae9f684ff93f88e111_HT_SOURCE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_40924e098ef84c4bb4fa6995c04fff0c111_HT_SOURCE') 
        async CT005UFUFWGSSSMXackSimulatorv1CT005PFPFDGSSSMXackSimulatorv1_4bbb77606dec4dd6b944d6949c35dffe_40924e098ef84c4bb4fa6995c04fff0c111_HT_SOURCE(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSSMXackSimulatorv1_3859c76d567f4eee94a6cea042fae639_d9d1tskgg2r0008943pg_HT_SUCCESS') 
        async CT005PFPFDGSSSMXackSimulatorv1_3859c76d567f4eee94a6cea042fae639_d9d1tskgg2r0008943pg_HT_SUCCESS(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}