import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFjsonb_dfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('jsonb_dfd_e61da357ddf8414aac63cac791d24df5_RequestInitiated') 
        async jsonb_dfd_e61da357ddf8414aac63cac791d24df5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('jsonb_dfd_a2b943bd34a4453c85c36110dddd35a0_RequestInitiated') 
        async jsonb_dfd_a2b943bd34a4453c85c36110dddd35a0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}