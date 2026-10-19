import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAIPassportController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AIPassport_d40c71058105421c94dacb35b38dcbe4_RequestInitiated') 
        async AIPassport_d40c71058105421c94dacb35b38dcbe4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}