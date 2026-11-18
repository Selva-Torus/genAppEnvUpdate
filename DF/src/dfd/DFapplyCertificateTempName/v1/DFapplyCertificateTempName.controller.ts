import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFapplyCertificateTempNameController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('applyCertificateTempName_764037cc30755ed90095dae8dfacf4f4_RequestInitiated') 
        async applyCertificateTempName_764037cc30755ed90095dae8dfacf4f4_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}