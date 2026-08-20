import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFrejectPopupDfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('rejectPopupDfd_d29b375f45f64a8f903a84281048a662_RequestInitiated') 
        async rejectPopupDfd_d29b375f45f64a8f903a84281048a662_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}