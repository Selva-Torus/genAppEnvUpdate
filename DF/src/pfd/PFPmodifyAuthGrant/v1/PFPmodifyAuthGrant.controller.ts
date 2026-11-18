import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPmodifyAuthGrantController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAuthGrantv1CT003PFPFDTAGTAGmodifyAuthGrantv1_ff404522c581b7ad5eea4f6ba0c253eb_b8770f785685833b3c77a67ae248ce7b111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAuthGrantv1CT003PFPFDTAGTAGmodifyAuthGrantv1_ff404522c581b7ad5eea4f6ba0c253eb_b8770f785685833b3c77a67ae248ce7b111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003UFUFWTAGTAGdeleteAuthGrantv1CT003PFPFDTAGTAGmodifyAuthGrantv1_ff404522c581b7ad5eea4f6ba0c253eb_6612753e10c5a75d2b642293f75256dd111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGdeleteAuthGrantv1CT003PFPFDTAGTAGmodifyAuthGrantv1_ff404522c581b7ad5eea4f6ba0c253eb_6612753e10c5a75d2b642293f75256dd111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAuthGrantv1_7ff6da7aa22cb8ecf8de752ce24946b3_77ffda39101e487ca6fcfc87a5d50f51_decisionnode_initiated') 
        async CT003PFPFDTAGTAGmodifyAuthGrantv1_7ff6da7aa22cb8ecf8de752ce24946b3_77ffda39101e487ca6fcfc87a5d50f51_decisionnode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAuthGrantv1_4dc11867c5c264c314092632e47a7ebf_0831b87da6504f17acf81510c73d59b1_authGrant_updated') 
        async CT003PFPFDTAGTAGmodifyAuthGrantv1_4dc11867c5c264c314092632e47a7ebf_0831b87da6504f17acf81510c73d59b1_authGrant_updated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGmodifyAuthGrantv1_90422339bbc1217a2578ad3688fb63d6_cfef3a0bcae54b5f84948eac34bde529_authGrant_deleted') 
        async CT003PFPFDTAGTAGmodifyAuthGrantv1_90422339bbc1217a2578ad3688fb63d6_cfef3a0bcae54b5f84948eac34bde529_authGrant_deleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}