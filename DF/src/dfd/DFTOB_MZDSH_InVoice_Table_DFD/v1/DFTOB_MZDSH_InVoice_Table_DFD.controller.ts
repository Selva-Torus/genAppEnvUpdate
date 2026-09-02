import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_MZDSH_InVoice_Table_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_MZDSH_InVoice_Table_DFD_a077a4cb79e849f9ad5001ac7cbb0adb_MongoRequestInitiated') 
        async TOB_MZDSH_InVoice_Table_DFD_a077a4cb79e849f9ad5001ac7cbb0adb_MongoRequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_MZDSH_InVoice_Table_DFD_b4487d84dece44448e7b9cfbd7b78ace_MongoRequestSucess') 
        async TOB_MZDSH_InVoice_Table_DFD_b4487d84dece44448e7b9cfbd7b78ace_MongoRequestSucess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}