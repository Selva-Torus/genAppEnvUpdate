import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFidentityAuthController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('identityAuth_c1f4031afe2be0161c63319d8d0bef5a_RequestInitiated') 
        async identityAuth_c1f4031afe2be0161c63319d8d0bef5a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}