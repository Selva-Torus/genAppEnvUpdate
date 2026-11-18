import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddToolGrantController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddToolGrantv1CT003PFPFDTAGTAGaddToolGrantv1_3dd6db25d10eb1c5929284bcd701a3f1_37510a8783f9d3c82b6e006f845956fd111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddToolGrantv1CT003PFPFDTAGTAGaddToolGrantv1_3dd6db25d10eb1c5929284bcd701a3f1_37510a8783f9d3c82b6e006f845956fd111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddToolGrantv1_dc5669f2afee95550d73ae47e0c70c4d_dbsb7exg5z8g008c7dvg_post_tool_grant_initiated') 
        async CT003PFPFDTAGTAGaddToolGrantv1_dc5669f2afee95550d73ae47e0c70c4d_dbsb7exg5z8g008c7dvg_post_tool_grant_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}