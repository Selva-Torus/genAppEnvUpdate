import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassignDocTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assignDocTable_02ab6e31192949cd8f95401bcce4e927_RequestInitiated') 
        async assignDocTable_02ab6e31192949cd8f95401bcce4e927_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}