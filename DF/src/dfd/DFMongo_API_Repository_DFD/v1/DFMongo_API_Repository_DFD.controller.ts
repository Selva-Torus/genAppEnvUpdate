import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFMongo_API_Repository_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('Mongo_API_Repository_DFD_ec637a0a8be14dbb91020ce8e054e709_APIRequestInitiated') 
        async Mongo_API_Repository_DFD_ec637a0a8be14dbb91020ce8e054e709_APIRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('Mongo_API_Repository_DFD_fcdd4a9059f84161990c20c300139cd7_APIRequestCompleted') 
        async Mongo_API_Repository_DFD_fcdd4a9059f84161990c20c300139cd7_APIRequestCompleted(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}