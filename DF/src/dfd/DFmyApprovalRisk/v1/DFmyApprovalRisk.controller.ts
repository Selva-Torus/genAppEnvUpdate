import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFmyApprovalRiskController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('myApprovalRisk_f716d63de89862730abb93cc9400327d_RequestInitiated') 
        async myApprovalRisk_f716d63de89862730abb93cc9400327d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}