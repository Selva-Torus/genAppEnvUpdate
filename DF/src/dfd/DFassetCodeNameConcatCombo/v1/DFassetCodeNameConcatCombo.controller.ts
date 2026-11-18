import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFassetCodeNameConcatComboController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('assetCodeNameConcatCombo_3cbdefdf9286655a4f93126f99b1e783_RequestInitiated') 
        async assetCodeNameConcatCombo_3cbdefdf9286655a4f93126f99b1e783_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}