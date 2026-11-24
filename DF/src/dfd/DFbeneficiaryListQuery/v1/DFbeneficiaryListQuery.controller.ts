import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFbeneficiaryListQueryController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('beneficiaryListQuery_add2082db87f4245b261c1142eee6df0_RequestInitiated') 
        async beneficiaryListQuery_add2082db87f4245b261c1142eee6df0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}