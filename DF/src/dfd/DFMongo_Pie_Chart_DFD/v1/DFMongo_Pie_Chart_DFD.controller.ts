import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFMongo_Pie_Chart_DFDController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('Mongo_Pie_Chart_DFD_feddb94d93ad4bcc831513bebfc6c1f4_DBIntiatied') 
        async Mongo_Pie_Chart_DFD_feddb94d93ad4bcc831513bebfc6c1f4_DBIntiatied(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('Mongo_Pie_Chart_DFD_7c2d51610e71467aa8ed367f2fa0371e_DBIntiatiedSucess') 
        async Mongo_Pie_Chart_DFD_7c2d51610e71467aa8ed367f2fa0371e_DBIntiatiedSucess(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}