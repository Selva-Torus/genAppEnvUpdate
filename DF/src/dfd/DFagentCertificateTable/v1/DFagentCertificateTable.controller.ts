import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFagentCertificateTableController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('agentCertificateTable_0b7acec48525b5006b6645962e2dfe0f_RequestInitiated') 
        async agentCertificateTable_0b7acec48525b5006b6645962e2dfe0f_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}