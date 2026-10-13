import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFwpsDashboardMyqueueActionRequiredController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('wpsDashboardMyqueueActionRequired_b945f8198676411b8e654620afbdfedc_RequestInitiated') 
        async wpsDashboardMyqueueActionRequired_b945f8198676411b8e654620afbdfedc_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}