import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFAttachEvidenceController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('AttachEvidence_49b405c43b13428ba121c784ad0bb565_RequestInitiated') 
        async AttachEvidence_49b405c43b13428ba121c784ad0bb565_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}