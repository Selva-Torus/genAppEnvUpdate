import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddRiskRuleController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddRiskRulev1CT003PFPFDTAGTAGaddRiskRulev1_8acb00cb677641afa399cedb3a346832_d5b9378a92a6409094f0c49b8851a97d111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddRiskRulev1CT003PFPFDTAGTAGaddRiskRulev1_8acb00cb677641afa399cedb3a346832_d5b9378a92a6409094f0c49b8851a97d111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddRiskRulev1_bafd4a8aaa094f5d9d0cc11092bf49e9_dax07x7zkz4g00879t7g_apinode_initiated') 
        async CT003PFPFDTAGTAGaddRiskRulev1_bafd4a8aaa094f5d9d0cc11092bf49e9_dax07x7zkz4g00879t7g_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}