import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaccessRequestController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('accessRequest_154f508b36b04282a9ce9649a522b96e_RequestInitiated') 
        async accessRequest_154f508b36b04282a9ce9649a522b96e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('accessRequest_e7f9ec0ebbca444d969325a9609ccbb3_RequestInitiated') 
        async accessRequest_e7f9ec0ebbca444d969325a9609ccbb3_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}