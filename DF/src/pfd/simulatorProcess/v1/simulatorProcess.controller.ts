import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { PoEvent } from "src/dto";
import { DynamicFlowService } from "src/Torus/v1/te/dynamicFlow.service";

@Controller('pf')
export class simulatorProcessController {
   constructor(private readonly dynamicFlowService:DynamicFlowService){}

        @EventPattern('CT005UFUFWGSSRTGSsimulatorProcessUiv1CT005PFPFDGSSRTGSsimulatorProcessv1_89259b2d20b944a98b636ae4f0822fe7_d747095e02c64729bb337dadb98cf1e2111_intiate') 
        async CT005UFUFWGSSRTGSsimulatorProcessUiv1CT005PFPFDGSSRTGSsimulatorProcessv1_89259b2d20b944a98b636ae4f0822fe7_d747095e02c64729bb337dadb98cf1e2111_intiate(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
           @EventPattern('CT005PFPFDGSSRTGSsimulatorProcessv1_85b494d8e4324f03bb7982a2068fbbd5_da2tnf5pndg0008eb6x0_simulator_api_initiated') 
        async CT005PFPFDGSSRTGSsimulatorProcessv1_85b494d8e4324f03bb7982a2068fbbd5_da2tnf5pndg0008eb6x0_simulator_api_initiated(input: PoEvent) { 
           return await this.dynamicFlowService.DynamicFlowProcess(input)
        }       
    
}