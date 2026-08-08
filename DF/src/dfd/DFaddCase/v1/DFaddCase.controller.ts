import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaddCaseController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('addCase_cabc38642017af8cd78c51ea0e880746_RequestInitiated') 
        async addCase_cabc38642017af8cd78c51ea0e880746_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('addCase_0b84a99163eb8dd425338976559dd501_RequestInitiated') 
        async addCase_0b84a99163eb8dd425338976559dd501_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}