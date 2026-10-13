import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFenquiryViewAllEmployersController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('enquiryViewAllEmployers_821f5acd512d4ee39a3942a08afd9f85_RequestInitiated') 
        async enquiryViewAllEmployers_821f5acd512d4ee39a3942a08afd9f85_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}