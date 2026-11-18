import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFtoolGrandAuthorityController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('toolGrandAuthority_7576589ef37d918c5368ea35b34276e5_RequestInitiated') 
        async toolGrandAuthority_7576589ef37d918c5368ea35b34276e5_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}