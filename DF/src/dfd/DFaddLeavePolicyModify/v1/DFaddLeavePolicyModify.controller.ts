import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFaddLeavePolicyModifyController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('addLeavePolicyModify_7e0acbb5e7e544e883d62c4943ac4a11_RequestInitiated') 
        async addLeavePolicyModify_7e0acbb5e7e544e883d62c4943ac4a11_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('addLeavePolicyModify_4e279f3010e947cda8cc341d6c0ac371_RequestInitiated') 
        async addLeavePolicyModify_4e279f3010e947cda8cc341d6c0ac371_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}