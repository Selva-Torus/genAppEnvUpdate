import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddCodeValueController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddCodeValuesv1CT003PFPFDTAGTAGaddCodeValuev1_aef2b7cd2aaa49f684055664e47fcea5_eab144631c59495ba639fe8a42be4335111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddCodeValuesv1CT003PFPFDTAGTAGaddCodeValuev1_aef2b7cd2aaa49f684055664e47fcea5_eab144631c59495ba639fe8a42be4335111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCodeValuev1_9aa704bc995c4745b2b3c00d930f8b16_damh1xzh1bp0008f5kjg_codeValueCompleted') 
        async CT003PFPFDTAGTAGaddCodeValuev1_9aa704bc995c4745b2b3c00d930f8b16_damh1xzh1bp0008f5kjg_codeValueCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddCodeValuev1_716381707fed4fa696ebf1851f324568_damfbhph1bp0008f56q0_success') 
        async CT003PFPFDTAGTAGaddCodeValuev1_716381707fed4fa696ebf1851f324568_damfbhph1bp0008f56q0_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}