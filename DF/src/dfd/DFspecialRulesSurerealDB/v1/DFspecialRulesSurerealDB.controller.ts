import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFspecialRulesSurerealDBController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('specialRulesSurerealDB_5c1ed2d414f740ab820856297865df26_RequestInitiated') 
        async specialRulesSurerealDB_5c1ed2d414f740ab820856297865df26_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}