import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_Consent_Request_CA_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_Consent_Request_CA_DFD_9aecfcd6592d4ba4a2e98a245a336a85_APIRequestInitiated') 
        async TOB_Consent_Request_CA_DFD_9aecfcd6592d4ba4a2e98a245a336a85_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_Consent_Request_CA_DFD_1d3ec37c8ea844dd884bb307979f28bf_APIRequestCompleted') 
        async TOB_Consent_Request_CA_DFD_1d3ec37c8ea844dd884bb307979f28bf_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}