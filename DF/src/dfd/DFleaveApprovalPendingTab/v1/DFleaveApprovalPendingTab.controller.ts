import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFleaveApprovalPendingTabController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('leaveApprovalPendingTab_b9e500f5bb474a7886c705fedfbfcd9e_RequestInitiated') 
        async leaveApprovalPendingTab_b9e500f5bb474a7886c705fedfbfcd9e_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('leaveApprovalPendingTab_3c596906d8fb460c8066e3d6c1fd4bc2_RequestInitiated') 
        async leaveApprovalPendingTab_3c596906d8fb460c8066e3d6c1fd4bc2_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}