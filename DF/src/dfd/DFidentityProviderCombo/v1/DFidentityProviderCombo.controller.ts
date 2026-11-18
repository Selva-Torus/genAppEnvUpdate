import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFidentityProviderComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('identityProviderCombo_19546310d7712b3bf179548b7cc57b74_RequestInitiated') 
        async identityProviderCombo_19546310d7712b3bf179548b7cc57b74_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}