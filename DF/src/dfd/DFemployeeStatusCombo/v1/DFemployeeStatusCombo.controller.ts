import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFemployeeStatusComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('employeeStatusCombo_4b1749f0175a4b7da9e7f7c621904bf9_RequestInitiated') 
        async employeeStatusCombo_4b1749f0175a4b7da9e7f7c621904bf9_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}