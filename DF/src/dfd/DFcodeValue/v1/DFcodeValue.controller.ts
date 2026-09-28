import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcodeValueController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('codeValue_93802f18715f4e1c90c6ec03ed2d0b7d_RequestInitiated') 
        async codeValue_93802f18715f4e1c90c6ec03ed2d0b7d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}