import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class cdcusertablesaveController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT001UFUFWTGW01TGW004makerv1CT001PFPFDTGW01TGW004cdcusertablesavev1_da952c0311c94b6291657429916c688e_a20fcc478d3a40dc903c64d419912f95111_h_start') 
        async CT001UFUFWTGW01TGW004makerv1CT001PFPFDTGW01TGW004cdcusertablesavev1_da952c0311c94b6291657429916c688e_a20fcc478d3a40dc903c64d419912f95111_h_start(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT001UFUFWTGW01TGW004checkerv1CT001PFPFDTGW01TGW004cdcusertablesavev1_da952c0311c94b6291657429916c688e_63095ecc999042a1b79f108fab3c8dd3111_h_started') 
        async CT001UFUFWTGW01TGW004checkerv1CT001PFPFDTGW01TGW004cdcusertablesavev1_da952c0311c94b6291657429916c688e_63095ecc999042a1b79f108fab3c8dd3111_h_started(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT001PFPFDTGW01TGW004cdcusertablesavev1_cb7bb72bf27b4e8ab1241107d8c65623_d98bs4mgg2r00088t7p0_h_success') 
        async CT001PFPFDTGW01TGW004cdcusertablesavev1_cb7bb72bf27b4e8ab1241107d8c65623_d98bs4mgg2r00088t7p0_h_success(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}