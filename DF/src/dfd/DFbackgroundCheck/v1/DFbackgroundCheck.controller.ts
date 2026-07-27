import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbackgroundCheckController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('backgroundCheck_f4c1ac4eac0c47628ae504d7fc5956bc_RequestInitiated') 
        async backgroundCheck_f4c1ac4eac0c47628ae504d7fc5956bc_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('backgroundCheck_af6570d7e7e84152af8380e55b1d020d_RequestInitiated') 
        async backgroundCheck_af6570d7e7e84152af8380e55b1d020d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}