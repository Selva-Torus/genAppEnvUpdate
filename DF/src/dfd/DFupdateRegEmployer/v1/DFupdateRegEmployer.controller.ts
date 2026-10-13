import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFupdateRegEmployerController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('updateRegEmployer_5e7cd9029d371780217d0326208389a0_RequestInitiated') 
        async updateRegEmployer_5e7cd9029d371780217d0326208389a0_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}