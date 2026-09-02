import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_Consents_Request_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_Consents_Request_DFD_776e58c267f64b39880549802745af00_APIRequestInitiated') 
        async TOB_Consents_Request_DFD_776e58c267f64b39880549802745af00_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_Consents_Request_DFD_057a296a065942fa86b7364774487493_APIRequestCompleted') 
        async TOB_Consents_Request_DFD_057a296a065942fa86b7364774487493_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}