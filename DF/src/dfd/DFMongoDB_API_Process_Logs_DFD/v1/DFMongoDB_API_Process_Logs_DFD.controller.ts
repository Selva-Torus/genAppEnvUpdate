import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFMongoDB_API_Process_Logs_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('MongoDB_API_Process_Logs_DFD_7f2ec8b8c5214c2194a8f1e0a48dad16_APIRequestInitiated') 
        async MongoDB_API_Process_Logs_DFD_7f2ec8b8c5214c2194a8f1e0a48dad16_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('MongoDB_API_Process_Logs_DFD_cc5e4fe5588d49a59210d263bc8c83a3_APIRequestCompleted') 
        async MongoDB_API_Process_Logs_DFD_cc5e4fe5588d49a59210d263bc8c83a3_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}