import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_Total_Used_API_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_Total_Used_API_DFD_7549d635bde34c14abb416b9687cc687_APIRequestInitiated') 
        async TOB_Total_Used_API_DFD_7549d635bde34c14abb416b9687cc687_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_Total_Used_API_DFD_d5ec70df840c405584dd816b00902328_APIRequestCompleted') 
        async TOB_Total_Used_API_DFD_d5ec70df840c405584dd816b00902328_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}