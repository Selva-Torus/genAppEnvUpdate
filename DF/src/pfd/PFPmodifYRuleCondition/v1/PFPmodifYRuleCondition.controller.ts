import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifYRuleConditionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddRiskRuleConditionv1CT003PFPFDTAGTAGmodifYRuleConditionv1_e43371ac5d044145a51ff41718b04229_a7a59bda7cc8d2e83e911afaeaa0e469111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddRiskRuleConditionv1CT003PFPFDTAGTAGmodifYRuleConditionv1_e43371ac5d044145a51ff41718b04229_a7a59bda7cc8d2e83e911afaeaa0e469111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifYRuleConditionv1_f10a1c3676994c209888016733daa569_db1jantc4fm0008n1b7g_updateCompleted') 
        async CT003PFPFDTAGTAGmodifYRuleConditionv1_f10a1c3676994c209888016733daa569_db1jantc4fm0008n1b7g_updateCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifYRuleConditionv1_c0432d2df32b446cada2b38ab6c44106_db1jantc4fm0008n1b80_edit') 
        async CT003PFPFDTAGTAGmodifYRuleConditionv1_c0432d2df32b446cada2b38ab6c44106_db1jantc4fm0008n1b80_edit(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}