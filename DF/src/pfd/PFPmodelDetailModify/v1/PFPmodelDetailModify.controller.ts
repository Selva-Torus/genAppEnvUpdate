import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodelDetailModifyController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAIModelsv1CT003PFPFDTAGTAGmodelDetailModifyv1_c2f2c2f302d562f59bbc054ee162b0b3_2d32e0b2509112d3e4d626dc2f02a5c4111_RequestInitaition') 
        async CT003UFUFWTAGTAGaddAIModelsv1CT003PFPFDTAGTAGmodelDetailModifyv1_c2f2c2f302d562f59bbc054ee162b0b3_2d32e0b2509112d3e4d626dc2f02a5c4111_RequestInitaition(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGmodelDeletev1CT003PFPFDTAGTAGmodelDetailModifyv1_c2f2c2f302d562f59bbc054ee162b0b3_d451da35d855acd5cdd8ae79f6a1f59f111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGmodelDeletev1CT003PFPFDTAGTAGmodelDetailModifyv1_c2f2c2f302d562f59bbc054ee162b0b3_d451da35d855acd5cdd8ae79f6a1f59f111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodelDetailModifyv1_42072d0cf1dc49b99b656b68603f8ec0_datyk7czkz4g008xkhq0_RequestCompleted') 
        async CT003PFPFDTAGTAGmodelDetailModifyv1_42072d0cf1dc49b99b656b68603f8ec0_datyk7czkz4g008xkhq0_RequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodelDetailModifyv1_caaa367c1f3416b695243438d348eb50_08dc398029954057862fb2bba79b81b0_Model_Modified') 
        async CT003PFPFDTAGTAGmodelDetailModifyv1_caaa367c1f3416b695243438d348eb50_08dc398029954057862fb2bba79b81b0_Model_Modified(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodelDetailModifyv1_7198c4ac1225486ab6e73bcc77043bf2_datyk7czkz4g008xkhr0_Model_Deleted') 
        async CT003PFPFDTAGTAGmodelDetailModifyv1_7198c4ac1225486ab6e73bcc77043bf2_datyk7czkz4g008xkhr0_Model_Deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}