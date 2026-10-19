import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFmyApprovalTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('myApprovalTable_34f482f44d5d6c74561029f75e380d9e_RequestInitiated') 
        async myApprovalTable_34f482f44d5d6c74561029f75e380d9e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}