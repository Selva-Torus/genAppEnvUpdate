import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdashboardViewAllSuccessController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('dashboardViewAllSuccess_e6b5b689b16037edc0697d8223907373_RequestInitiated') 
        async dashboardViewAllSuccess_e6b5b689b16037edc0697d8223907373_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}