import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPdataClassModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGAIDataClassv1CT003PFPFDTAGTAGdataClassModifyv1_2abbf3a58746fc8906502ffcc2749e3c_c22985db5a514519d342a147599845af111_RequestInitaition') 
        async CT003UFUFWTAGTAGAIDataClassv1CT003PFPFDTAGTAGdataClassModifyv1_2abbf3a58746fc8906502ffcc2749e3c_c22985db5a514519d342a147599845af111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdataClassDeletev1CT003PFPFDTAGTAGdataClassModifyv1_2abbf3a58746fc8906502ffcc2749e3c_6b73a75cef06193ee1593eaee1b25863111_RequestInitaition') 
        async CT003UFUFWTAGTAGdataClassDeletev1CT003PFPFDTAGTAGdataClassModifyv1_2abbf3a58746fc8906502ffcc2749e3c_6b73a75cef06193ee1593eaee1b25863111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdataClassModifyv1_4a9ab3d1b63942679ff36366dd4254c1_datzgm2zkz4g008xks2g_RequestCompleted') 
        async CT003PFPFDTAGTAGdataClassModifyv1_4a9ab3d1b63942679ff36366dd4254c1_datzgm2zkz4g008xks2g_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdataClassModifyv1_ac4473235d73cea417f446699b8fb289_f75b5c6c625c4f738655d5ee99c30d92_Class_Modified') 
        async CT003PFPFDTAGTAGdataClassModifyv1_ac4473235d73cea417f446699b8fb289_f75b5c6c625c4f738655d5ee99c30d92_Class_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGdataClassModifyv1_7701bebbf16b47b39e86f93fba3675c1_datzgm2zkz4g008xks3g_Class_Deleted') 
        async CT003PFPFDTAGTAGdataClassModifyv1_7701bebbf16b47b39e86f93fba3675c1_datzgm2zkz4g008xks3g_Class_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}