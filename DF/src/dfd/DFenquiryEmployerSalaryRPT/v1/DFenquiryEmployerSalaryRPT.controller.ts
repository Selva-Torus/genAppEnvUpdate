import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFenquiryEmployerSalaryRPTController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('enquiryEmployerSalaryRPT_c31ba7e5326d30ceaa76661bbcf6e08b_RequestInitiated') 
        async enquiryEmployerSalaryRPT_c31ba7e5326d30ceaa76661bbcf6e08b_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}