import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFintegrationSourceComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('integrationSourceCombo_5bbcd6eda9852335c39383d6d10ad307_RequestInitiated') 
        async integrationSourceCombo_5bbcd6eda9852335c39383d6d10ad307_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}