import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPJsonB_PFController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT001UFUFWTAMTAJsonbv1CT001PFPFDTAMTAJsonBPFv1_3e7db623ae5948c5ada3cccb7049c6f1_e25285c9df47405ea65a8853a1ae80dc111_humantasknode_initiated') 
        async CT001UFUFWTAMTAJsonbv1CT001PFPFDTAMTAJsonBPFv1_3e7db623ae5948c5ada3cccb7049c6f1_e25285c9df47405ea65a8853a1ae80dc111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT001PFPFDTAMTAJsonBPFv1_d02f19c07d614481bfefc84ff00c443c_dayfcrkz6ghg0085bxfg_apinode_initiated') 
        async CT001PFPFDTAMTAJsonBPFv1_d02f19c07d614481bfefc84ff00c443c_dayfcrkz6ghg0085bxfg_apinode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}