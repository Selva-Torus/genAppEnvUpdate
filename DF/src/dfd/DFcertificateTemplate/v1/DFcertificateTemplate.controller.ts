import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcertificateTemplateController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('certificateTemplate_2dbcf73d35f445d6bc631b064cb693c6_RequestInitiated') 
        async certificateTemplate_2dbcf73d35f445d6bc631b064cb693c6_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('certificateTemplate_2a12c3534d6f4cd38f30c92d0bf4f30a_RequestInitiated') 
        async certificateTemplate_2a12c3534d6f4cd38f30c92d0bf4f30a_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}