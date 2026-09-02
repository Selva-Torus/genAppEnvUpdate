import { BadRequestException,Injectable, Logger } from '@nestjs/common';
//import { Operation } from './dto';
import { RedisService } from 'src/redisService';
import { CommonService } from 'src/common.Service';
import { AxiosRequestConfig } from 'axios';
import { CustomException } from 'src/apiInt/customException';
import { pfDto } from 'src/dto';
const _ = require("lodash")
type MappingValue = string | { sourcePath: string; arrayMap: Record< string, string> };
type MappingConfig = Record< string, MappingValue>;

@Injectable()

export class APITOB_Consent_Event_OperationService {   
  constructor(private readonly redisService: RedisService,private readonly commonService: CommonService) {}
  private readonly logger = new Logger(APITOB_Consent_Event_OperationService.name);

  async APITOB_Consent_Event_Operation(dataSet,params,query,token,header){
    let apiResponses,apiErrorCodes
    try {  
      let client = process.env.CLIENTCODE 
       let patharr = []
      let headersarr = []
      let queryarr = []    
      let pfdto = new pfDto() 
      //(!dataSet || dataSet?.length == 0 || Object.keys(dataSet).length == 0) throw 'Data not found'
      //if(!(Array.isArray(dataSet)) && typeof dataSet == 'object'){
        //dataSet = [dataSet]
      //}
       //if(dataSet?.length>0){
        //dataSet = dataSet[0]?.data
      //}
      let ApiKey = 'CK:CT003:FNGK:AF:FNK:PF-PFD:CATK:Trs:AFGK:TOB:AFK:TOB_Consent_Event_Operation:AFVK:v1:' 
      let fabric = await this.commonService.splitcommonkey(ApiKey,'FNK')
      let AfdNdp:any = JSON.parse(await this.redisService.getJsonData(ApiKey+'NDP',client))  
      if(!AfdNdp) throw 'NDP value was empty'
       let AfdPo: any = JSON.parse(await this.redisService.getJsonData(ApiKey + 'PO', client))
      if (!AfdPo) throw 'PO value was empty'
      let poNode = AfdPo?.mappedData?.artifact?.node
      if(poNode?.length > 0){
        pfdto.nodeId = poNode[1].nodeId
        for(let p=0;p< poNode.length;p++){
          if(poNode[1]?.events?.length > 0) {          
            if(poNode[1].events[0].eventType == 'PEH'){
              pfdto.event = poNode[1].events[0].source.status
            }            
          }
        }
      }
      let referenceKey:any
      if(AfdNdp && Object.keys(AfdNdp).length>0){       
        for(let singleNode in AfdNdp){
          if(AfdNdp[singleNode].nodeType === "api_outputnode"){
            referenceKey = AfdNdp[singleNode].apiKey
            break
          }
        }
      }
      
      let apiNdp = JSON.parse(await this.redisService.getJsonData(referenceKey,client))  
      if(!apiNdp) throw 'ReferenceKey value was empty'
      let apiData = apiNdp[Object.keys(apiNdp)[0]]['data']  
      apiResponses = apiData[apiData?.method.toLowerCase()]?.responses
      apiErrorCodes = Object.keys(apiResponses)
      apiErrorCodes = apiErrorCodes.map((errCode) => {        
        return isNaN(Number(errCode)) ? errCode :  Number(errCode);        
      })
      var parameterJson = apiData?.parameterJson  

      if (!token) {
        if (apiErrorCodes.includes(401))
          throw new CustomException("Token not found", 401)
      }
     
       if(!dataSet || dataSet?.length == 0 || Object.keys(dataSet).length == 0){
        if(apiErrorCodes.includes(400)){         
          throw new CustomException("Invalid Request Parameter",400)     
        }
      }
      if (query && Object.keys(query).length == 0) {
              query = parameterJson?.query
            }

            if (params && Object.keys(params).length == 0) {
              params = parameterJson?.path
            }

            if (header && Object.keys(header).length == 0) {
              header = parameterJson?.header
            }
          

            var parameters = apiData[apiData?.method.toLowerCase()]?.parameters
           
            if (parameters?.length > 0) {
              for (let a = 0; a < parameters.length; a++) {
                if (parameters[a].in == 'query' && parameters[a].required == true) {
                  queryarr.push(parameters[a].name)
                } else if (parameters[a].in == 'header' && parameters[a].required == true) {                  
                  headersarr.push(parameters[a].name)
                } else if (parameters[a].in == 'path' && parameters[a].required == true) {
                  patharr.push(parameters[a].name)
                }
              }
            } 
            if (header && Object.keys(header).length > 0) {
                  if (headersarr && headersarr.length > 0) {
                    for (let b = 0; b < headersarr.length; b++) {
                      if (!(header[headersarr[b]])) {
                        // 'Header ' + headersarr[b] + ' is required'
                        if(apiErrorCodes.includes(401))
                        throw new CustomException('Header ' + headersarr[b] + ' is required',401)
                       //throw new UnauthorizedException('Header ' + headersarr[b] + ' is required')
                      }
                    }
                  }
                }

                if (query && Object.keys(query).length > 0) {
                  if (queryarr && queryarr.length > 0) {
                    for (let b = 0; b < queryarr.length; b++) {
                      if (!(query[queryarr[b]])) {
                        //throw 'Query ' + queryarr[b] + ' is required'
                        if(apiErrorCodes.includes(401))
                         throw new CustomException('Query ' + queryarr[b] + ' is required',400)
                      }
                    }
                  }                 
                }

                if (params && Object.keys(params).length > 0) {
                  if (patharr && patharr.length > 0) {
                    for (let c = 0; c < patharr.length; c++) {
                      if (!(params[patharr[c]])) {
                        //throw 'Params ' + patharr[c] + ' is required'
                        if(apiErrorCodes.includes(401))
                         throw new CustomException('Params ' + patharr[c] + ' is required',400)
                      }
                    }
                  }                 
                }      
     
        const requestConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
       
        pfdto.key = ApiKey
        pfdto.data = {
          param:params,
          query:query,
          data:dataSet
        }       
        
        let dfdRes = await this.commonService.axiosPostCall(process.env.BE_URL+'/te/eventEmitter', pfdto,requestConfig)
              
        if(dfdRes?.data?.data && dfdRes?.data?.status)
          return Object.assign(dfdRes.data,{status: dfdRes.data.status}) 
        else
          return dfdRes?.data
          
       // return Object.assign(dfdRes.data,{status: dfdRes.status}) 
     
 
    } catch (error) {
      // console.log('ERR--',error);
      let err
      let sts
      if (error.response?.errorCode && error.response?.errorMessage) {
        throw error
      }
      else if (error.statusCode && error.message && apiErrorCodes.includes(error.statusCode)) {
        throw new CustomException(error.message, error.statusCode)
      } else {
        if (error.response?.data?.message && error.response?.data?.statusCode) {
          err = error.response.data.message
          sts = error.response.data.statusCode
        } else if (error.response?.data?.errorMessage && error.response?.data?.errorCode) {
          err = error.response.data.errorMessage
          sts = error.response.data.errorCode
        } else if (error.message) {
          err = error.message
          sts = error.status || 400
        }
        throw new CustomException(err, sts)
      }
    }      
  }  
}
