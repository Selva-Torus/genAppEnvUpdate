import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaimsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claims_bc4bccca5955454abe725ed8e8aad8c3_APIRequestInitiated') 
        async claims_bc4bccca5955454abe725ed8e8aad8c3_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claims_d4d9550eca7f46129886b6c11168e6b5_APIRequestCompleted') 
        async claims_d4d9550eca7f46129886b6c11168e6b5_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}