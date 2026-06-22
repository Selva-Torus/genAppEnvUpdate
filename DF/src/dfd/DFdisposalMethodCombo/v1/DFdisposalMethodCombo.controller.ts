import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdisposalMethodComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('disposalMethodCombo_953fe09aa41c499b92a5bb93868c9f90_RequestInitiated') 
        async disposalMethodCombo_953fe09aa41c499b92a5bb93868c9f90_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}