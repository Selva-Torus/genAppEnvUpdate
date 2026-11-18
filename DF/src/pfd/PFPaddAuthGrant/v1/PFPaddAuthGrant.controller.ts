import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class PFPaddAuthGrantController {
   constructor(
   private readonly dynamicFlowService:DynamicFlowService
   ){}

        @EventPattern('CT003UFUFWTAGTAGaddAuthGrantv1CT003PFPFDTAGTAGaddAuthGrantv1_75c66510ab251160f5a40031ce519f42_9ef437ecab164ad69c4cdbc3a6f923fc111_humantasknode_initiated') 
        async CT003UFUFWTAGTAGaddAuthGrantv1CT003PFPFDTAGTAGaddAuthGrantv1_75c66510ab251160f5a40031ce519f42_9ef437ecab164ad69c4cdbc3a6f923fc111_humantasknode_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT003PFPFDTAGTAGaddAuthGrantv1_674bf13a1c03c118a3b1e5604a5e7283_9b88b2e312964a91a7600020a9bb15f6_post_auth_grant_initiated') 
        async CT003PFPFDTAGTAGaddAuthGrantv1_674bf13a1c03c118a3b1e5604a5e7283_9b88b2e312964a91a7600020a9bb15f6_post_auth_grant_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}