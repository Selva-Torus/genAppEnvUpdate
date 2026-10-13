import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFenquiryGetRegEmployerEmployerListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('enquiryGetRegEmployerEmployerList_08c1b3db4f7e7521403bd8d002d2216f_RequestInitiated') 
        async enquiryGetRegEmployerEmployerList_08c1b3db4f7e7521403bd8d002d2216f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}