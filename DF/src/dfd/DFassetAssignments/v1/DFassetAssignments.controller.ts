import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetAssignmentsController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetAssignments_e2aeed8b52174252b5694c8bd8fa18e6_RequestInitiated') 
        async assetAssignments_e2aeed8b52174252b5694c8bd8fa18e6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('assetAssignments_b50b5e3a7b314f70bda35687ca3e035e_RequestInitiated') 
        async assetAssignments_b50b5e3a7b314f70bda35687ca3e035e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}