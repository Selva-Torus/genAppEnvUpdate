import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFintegrationRunController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('integrationRun_63cc5a2ae9bf485b84990ed8f50660d7_RequestInitiated') 
        async integrationRun_63cc5a2ae9bf485b84990ed8f50660d7_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('integrationRun_613ac786742f4fa5bd591e9424ba88f9_RequestInitiated') 
        async integrationRun_613ac786742f4fa5bd591e9424ba88f9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}