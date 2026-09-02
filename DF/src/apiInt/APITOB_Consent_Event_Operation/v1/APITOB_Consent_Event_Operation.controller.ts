import { Body, Controller, Get, Post, Req , Headers, Patch, Delete, Put } from '@nestjs/common';
import {  BadRequestException, UnauthorizedException } from 'src/customException';
import { APITOB_Consent_Event_OperationService } from './APITOB_Consent_Event_Operation.service';


@Controller()
export class APITOB_Consent_Event_OperationController {    
  constructor(private readonly apitob_consent_event_operationservice: APITOB_Consent_Event_OperationService) {}
 
  @Post('consent/event/:operation')
 // @ApiOkResponse({ status: 200, type:consent/event/:operation })
  async APITOB_Consent_Event_Operation(@Body() input, @Headers() auth: any,@Req() req: any) { 
    let token
      if(auth){
        token = auth?.torustoken; 
      if(!token){
        token = auth?.authorization?.split(' ')[1]
      }

      const header = auth
      const param = req.params?req.params:''
      const query = req.query?req.query:''      
      return await this.apitob_consent_event_operationservice.APITOB_Consent_Event_Operation(input,param,query,token,header)
    }   
  } 
}

