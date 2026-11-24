import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFnfTranMainTransactionController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('nfTranMainTransaction_f8a3cc18e5be43e493b48b711eda2b2d_RequestInitiated') 
        async nfTranMainTransaction_f8a3cc18e5be43e493b48b711eda2b2d_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}