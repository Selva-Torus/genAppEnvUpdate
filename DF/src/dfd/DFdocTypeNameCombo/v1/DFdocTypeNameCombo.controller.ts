import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFdocTypeNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('docTypeNameCombo_94ed8e1f2df5d8f8e4c62630edcb4e86_RequestInitiated') 
        async docTypeNameCombo_94ed8e1f2df5d8f8e4c62630edcb4e86_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}