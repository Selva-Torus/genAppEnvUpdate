import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('df')
export class DFset_db_nodeController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('set_db_node_f83b3b3fcf5640af908576a5125eccfd_RequestInitiated') 
        async set_db_node_f83b3b3fcf5640af908576a5125eccfd_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('set_db_node_8aae72de42924fabb9fce364c41b4c78_RequestInitiated') 
        async set_db_node_8aae72de42924fabb9fce364c41b4c78_RequestInitiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}