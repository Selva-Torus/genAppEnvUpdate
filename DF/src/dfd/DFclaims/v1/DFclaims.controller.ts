import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFclaimsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('claims_cf39c22d665e496184c6740f8e11559e_RequestInitiated') 
        async claims_cf39c22d665e496184c6740f8e11559e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('claims_d4d9550eca7f46129886b6c11168e6b5_RequestInitiated') 
        async claims_d4d9550eca7f46129886b6c11168e6b5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}