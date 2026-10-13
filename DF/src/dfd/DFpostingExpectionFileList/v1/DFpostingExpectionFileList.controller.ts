import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFpostingExpectionFileListController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('postingExpectionFileList_e93cf31861644940b098db5ca3f23edb_RequestInitiated') 
        async postingExpectionFileList_e93cf31861644940b098db5ca3f23edb_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}