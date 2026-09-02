import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFMongoDB_MainDashboard_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('MongoDB_MainDashboard_DFD_9baac16eefe4462f8c1b4434baa59d47_APIRequestInitiated') 
        async MongoDB_MainDashboard_DFD_9baac16eefe4462f8c1b4434baa59d47_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('MongoDB_MainDashboard_DFD_029e7dc0a9bb4da0b8e551c27f84bd97_APIRequestCompleted') 
        async MongoDB_MainDashboard_DFD_029e7dc0a9bb4da0b8e551c27f84bd97_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}