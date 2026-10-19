import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFriskRuleController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('riskRule_a6eeff9448da438e934edf93244fe199_RequestInitiated') 
        async riskRule_a6eeff9448da438e934edf93244fe199_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('riskRule_2e55d246da9442969f4ea329288d7219_RequestInitiated') 
        async riskRule_2e55d246da9442969f4ea329288d7219_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}