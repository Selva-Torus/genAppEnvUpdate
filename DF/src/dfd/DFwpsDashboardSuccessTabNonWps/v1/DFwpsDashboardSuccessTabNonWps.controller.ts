import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardSuccessTabNonWpsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardSuccessTabNonWps_0aad543f44aa4fdebcb91ad7b1e46fc6_RequestInitiated') 
        async wpsDashboardSuccessTabNonWps_0aad543f44aa4fdebcb91ad7b1e46fc6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}