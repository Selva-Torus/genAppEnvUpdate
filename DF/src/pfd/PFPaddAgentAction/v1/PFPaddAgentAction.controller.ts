import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAgentActionController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAgentActionsv1CT003PFPFDTAGTAGaddAgentActionv1_1313755745fdb2c7d29ae2c03440e9ee_34a5074a9a39a558d6ee4c59f582a9ed111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAgentActionsv1CT003PFPFDTAGTAGaddAgentActionv1_1313755745fdb2c7d29ae2c03440e9ee_34a5074a9a39a558d6ee4c59f582a9ed111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAgentActionv1_24f4de43b7d39e0a623d9f1abdb375ec_daspentzkz4g008xeweg_humantasknode_initiated_successfully') 
        async CT003PFPFDTAGTAGaddAgentActionv1_24f4de43b7d39e0a623d9f1abdb375ec_daspentzkz4g008xeweg_humantasknode_initiated_successfully(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAgentActionv1_88dab9def0402c199a24f686c572cefa_daspentzkz4g008xewf0_dbnode_initiated_successfully') 
        async CT003PFPFDTAGTAGaddAgentActionv1_88dab9def0402c199a24f686c572cefa_daspentzkz4g008xewf0_dbnode_initiated_successfully(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}