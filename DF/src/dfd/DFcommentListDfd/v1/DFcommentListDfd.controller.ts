import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFcommentListDfdController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('commentListDfd_6b56e843346d496cb61d4538ea942742_RequestInitiated') 
        async commentListDfd_6b56e843346d496cb61d4538ea942742_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}