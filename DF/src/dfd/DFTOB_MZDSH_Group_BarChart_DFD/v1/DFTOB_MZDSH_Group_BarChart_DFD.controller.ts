import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFTOB_MZDSH_Group_BarChart_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('TOB_MZDSH_Group_BarChart_DFD_ddc49ed9e9fd42c9bdb64aa94914ce44_MongoDBInitiated') 
        async TOB_MZDSH_Group_BarChart_DFD_ddc49ed9e9fd42c9bdb64aa94914ce44_MongoDBInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('TOB_MZDSH_Group_BarChart_DFD_b0276a88bead4235a9291bf59e6cb8b0_MongoDBInitiatedSucess') 
        async TOB_MZDSH_Group_BarChart_DFD_b0276a88bead4235a9291bf59e6cb8b0_MongoDBInitiatedSucess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}