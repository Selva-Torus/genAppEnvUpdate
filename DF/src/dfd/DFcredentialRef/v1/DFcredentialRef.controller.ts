import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcredentialRefController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('credentialRef_25d90083ac7741ae818c76431fdfb447_RequestInitiated') 
        async credentialRef_25d90083ac7741ae818c76431fdfb447_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('credentialRef_73c4e1e40ca240658574afa99cade004_RequestInitiated') 
        async credentialRef_73c4e1e40ca240658574afa99cade004_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}