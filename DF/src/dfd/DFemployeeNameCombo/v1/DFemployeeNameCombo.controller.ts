import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFemployeeNameComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('employeeNameCombo_a758612754cf966078a6a4acacbc5754_RequestInitiated') 
        async employeeNameCombo_a758612754cf966078a6a4acacbc5754_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}