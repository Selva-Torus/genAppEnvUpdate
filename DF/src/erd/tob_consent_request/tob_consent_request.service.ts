
import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CommonService } from 'src/common.Service';
import { CustomException } from 'src/customException';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { tob_api_process_logsEntity } from '../tob_api_process_logs/entity/tob_api_process_logs.entity';



@Injectable()
export class tob_consent_requestService {
  constructor(private readonly prismaService: PrismaService,
  private readonly commonService: CommonService) {}
  private encryptedCols: any={
  "tob_api_repository": [
    {
      "column": "tob_api_process_logs",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "tob_consent_request": [
    {
      "column": "request",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_consent_req"
    },
    {
      "column": "consentbody",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_consentbody"
    },
    {
      "column": "tpp",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_tpp"
    },
    {
      "column": "psuidentifiers",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_psuidentifiers"
    },
    {
      "column": "tob_api_process_logs",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "tob_api_process_logs": [],
  "tob_pricing_master": [],
  "tob_tpp_registry": [],
  "tob_tpp_api_pricing": [],
  "tob_tpp_invoice_payments": [],
  "tob_revenue_summary": [
    {
      "column": "revenue_by_api_type",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "revenue_api_type"
    }
  ],
  "tob_consent_req": [
    {
      "column": "consent",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_request_consent"
    },
    {
      "column": "subscription",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_subscription_consentreq"
    }
  ],
  "tob_request_consent": [
    {
      "column": "onbehalfof",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_request_onbehalfof"
    },
    {
      "column": "openfinancebilling",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_openfinance_billing"
    }
  ],
  "tob_request_onbehalfof": [],
  "tob_openfinance_billing": [],
  "tob_subscription_consentreq": [
    {
      "column": "webhook",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_subscription_webhook"
    }
  ],
  "tob_subscription_webhook": [],
  "tob_consentbody": [
    {
      "column": "data",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_ctbody_data"
    },
    {
      "column": "meta",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_conbody_multipleauth"
    },
    {
      "column": "subscription",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_subscription_consentbody"
    }
  ],
  "tob_ctbody_data": [
    {
      "column": "onbehalfof",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_ctbody_onbehalfof"
    },
    {
      "column": "openfinancebilling",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_ctbody_openfinancebilling"
    }
  ],
  "tob_conbody_multipleauth": [
    {
      "column": "multipleauthorizers",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_multiauth"
    }
  ],
  "tob_subscription_consentbody": [
    {
      "column": "webhook",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_sub_webhook"
    }
  ],
  "tob_sub_webhook": [],
  "tob_multiauth": [
    {
      "column": "authorizations",
      "isRequired": false,
      "dataType": "Array",
      "interRelation": "tob_multiauth_totalreq"
    }
  ],
  "tob_multiauth_totalreq": [],
  "tob_ctbody_onbehalfof": [],
  "tob_ctbody_openfinancebilling": [],
  "tob_tpp": [
    {
      "column": "decodedssa",
      "isRequired": false,
      "dataType": "Object",
      "interRelation": "tob_decodedssa"
    }
  ],
  "tob_decodedssa": [],
  "tob_psuidentifiers": [],
  "revenue_api_type": []
}

  async encryptData(data: any, tableName: string, method) {
    let encryptedData = { ...data };
    const columns = this.encryptedCols[tableName];
    if (!columns) return encryptedData;
    for (const table of columns) {
      if (table?.column in data && table.dataType === 'String') {
        const encryptedValue = await this.commonService.encrypt(
          data[table.column],table.column
        );
        encryptedData[table.column] = encryptedValue;
      } else if (table?.column in data && table.dataType === 'childtable') {
        if (
          data[table.column][method] &&
          !Array.isArray(data[table.column][method])
        ) {
          encryptedData[table.column][method] = await this.encryptData(
            data[table.column][method],
            table.column,
            method,
          );
        } else if (
          data[table.column][method] &&
          Array.isArray(data[table.column][method])
        ) {
          let tempArray = [];
          for (const chlldArray of data[table.column][method]) {
            tempArray.push(
              await this.encryptData(chlldArray, table.column, method),
            );
          }
          encryptedData[table.column]['create'] = tempArray;
        }
      } else if (
        table?.column in data &&
        table.dataType === 'Object'
      ) {
        let encryptedValue : any;
          if(Object.keys(data[table.column])[0] == "some"){
            encryptedValue = await this.encryptData(
              data[table.column].some,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["some"] = encryptedValue;
          }else if(Object.keys(data[table.column])[0] == "is"){
            encryptedValue = await this.encryptData(
              data[table.column].is,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["is"] = encryptedValue;
          }else{
            encryptedValue = await this.encryptData(
              data[table.column],
              table?.interRelation,
              method,
            );
            encryptedData[table.column] = encryptedValue;
          }
      } else if (
        table?.column in data &&
        table.dataType === 'Array' &&
        table?.interRelation != ''
      ) {
        let arrayObject: any = [];
        let check = data[table.column]
        if(!Array.isArray(check)){
          let encryptedValue : any;
          if(Object.keys(check)[0] == "some"){
            encryptedValue = await this.encryptData(
              check.some,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["some"] = encryptedValue;
          }
          if(Object.keys(check)[0] == "is"){
            encryptedValue = await this.encryptData(
              check.is,
              table?.interRelation,
              method,
            );
            encryptedData[table.column]["is"] = encryptedValue;
          }
        
        }else{
          for (const eachObject of data[table.column]) {
            const encryptedValue = await this.encryptData(
              eachObject,
              table?.interRelation,
              method,
            );
            arrayObject.push(encryptedValue);
          }
          encryptedData[table.column] = arrayObject;
        }
      }
    }
    return encryptedData;
  }

   async decryptData(data: any, tableName: string) {
    if (typeof data == 'string') return data;

    let encryptedData = { ...data };
    const columns = this.encryptedCols[tableName];
    if (!columns) return encryptedData;
    for (const table of columns) {
      if (table?.column in data && table.dataType == 'String') {
        if (
          data[table.column] != null &&
          data[table?.column] != '' &&
          data[table.column].startsWith('vault:')
        ) {
          const encryptedValue = await this.commonService.decrypt(
            data[table.column],
            table.column
          );
          encryptedData[table.column] = encryptedValue;
        }
      }
    }
    for (const key in encryptedData) {
      if (
        typeof encryptedData[key] === 'object' &&
        encryptedData[key] !== null
      ) {
        if (Array.isArray(encryptedData[key])) {
          let arrayDocName: string = '';
          this.encryptedCols[tableName].forEach((element: any) => {
            if (
              element.column == key &&
              element.interRelation != '' &&
              element.dataType == 'Array'
            ) {
              arrayDocName = element.interRelation;
            }
          });
          if (arrayDocName != '') {
            let tempArray = [];
            for (const eachObject of encryptedData[key]) {
              tempArray.push(await this.decryptData(eachObject, arrayDocName));
            }
            encryptedData[key] = tempArray;
          } else {
            let tempArray = [];
            for (const eachObject of encryptedData[key]) {
              tempArray.push(await this.decryptData(eachObject, key));
            }

            encryptedData[key] = tempArray;
          }
        } else if (Object.keys(encryptedData[key]).length > 0) {
          let docName: string = '';
          this.encryptedCols[tableName].forEach((element: any) => {
            if (
              element.column == key &&
              element.interRelation != '' &&
              (element.dataType == 'Object' || element.dataType == 'Array')
            ) {
              docName = element.interRelation;
            }
          });

          if (docName != '') {
            encryptedData[key] = await this.decryptData(
              encryptedData[key],
              docName,
            );
          } else {
            encryptedData[key] = await this.decryptData(
              encryptedData[key],
              key,
            );
          }
        }
      }
    }
    return encryptedData;
  }


  async findSchema (token) {
    const data = {
      id:"string",
      ids:"string",
      consentgroupid:"string",
      requesturl:"string",
      consenttype:"string",
      status:"string",
      request:{
  "type": "string",
  "consent": {
    "baseconsentid": "string",
    "expirationdatetime": "datetime",
    "transactionfromdatetime": "datetime",
    "transactiontodatetime": "datetime",
    "accounttype": "enum[]",
    "accountsubtype": "enum[]",
    "onbehalfof": {
      "tradingname": "string",
      "legalname": "string",
      "identifiertype": "enum",
      "identifier": "string"
    },
    "consentid": "string",
    "permissions": "enum[]",
    "openfinancebilling": {
      "usertype": "enum",
      "purpose": "enum"
    }
  },
  "subscription": {
    "webhook": {
      "url": "string",
      "isactive": "boolean"
    }
  }
},
      consentbody:{
  "data": {
    "baseconsentid": "string",
    "expirationdatetime": "string",
    "transactionfromdatetime": "string",
    "transactiontodatetime": "string",
    "accounttype": "enum[]",
    "accountsubtype": "enum[]",
    "onbehalfof": {
      "tradingname": "string",
      "legalname": "string",
      "identifiertype": "enum",
      "identifier": "string"
    },
    "status": "enum",
    "purpose": "enum[]",
    "revokedby": "enum",
    "openfinancebilling": {
      "islargecorporate": "boolean",
      "usertype": "enum",
      "purpose": "enum"
    },
    "creationdatetime": "string",
    "consentid": "string",
    "permissions": "enum[]"
  },
  "meta": {
    "multipleauthorizers": {
      "totalrequired": "int",
      "authorizations": [
        {
          "authorizerid": "string",
          "authorizertype": "string",
          "authorizationdate": "datetime",
          "authorizationstatus": "enum"
        }
      ]
    }
  },
  "subscription": {
    "webhook": {
      "url": "string",
      "isactive": "boolean"
    }
  }
},
      authorizationchannel: "enum",
      interactionid:"string",
      tpp:{
  "clientid": "string",
  "tppid": "string",
  "tppname": "string",
  "softwarestatementid": "string",
  "directoryrecord": "string",
  "decodedssa": {
    "redirect_uris": "string[]",
    "client_name": "string",
    "client_uri": "string",
    "logo_uri": "string",
    "jwks_uri": "string",
    "client_id": "string",
    "roles": "string[]",
    "sector_identifier_uri": "string",
    "application_type": "string",
    "organisation_id": "string"
  },
  "orgid": "string"
},
      updatedat:"number",
      parid:"string",
      rartype:"string",
      standardversion:"string",
      psuidentifiers:{
  "userid": "string"
},
      accountids: "string[]",
      connecttoken:"string",
      account_id:"string",
      trs_created_date:"Date",
      trs_created_by:"string",
      trs_modified_date:"Date",
      trs_modified_by:"string",
      trs_process_id:"string",
      trs_access_profile:"string",
      trs_org_grp_code:"string",
      trs_org_code:"string",
      trs_role_grp_code:"string",
      trs_role_code:"string",
      trs_ps_grp_code:"string",
      trs_ps_code:"string",
      trs_sub_org_code:"string",
      trs_sub_org_grp_code:"string",    
      trs_locked_by:"string",
      trs_locked_time:"Date",
      trs_tenant_id:"string",    
      trs_app_code:"string",         
      trs_product_code:"string",
      trs_event_process_status:"string",         
      trs_event_status:"string",
    }
    return data;
  }

  async findAllmethod(queryDto: any, limit:number,selectColumns:any,token:any) {
    try {
      let queryCondition:any ={}
      let queryValue:any = {}
      let columns:any = {}
      selectColumns?.forEach(element => {
        columns[element] = true
      });
      Object.keys(queryDto).forEach((key) => {
        if (key.includes('-')) {
          queryCondition[key.split('-')[0]] = key.split('-')[1]
          queryValue[key.split('-')[0]] = queryDto[key]
        }
      })      
      const { page }: { page: number } = queryDto;
      let query: any = {}; 
      const { ids }: {ids : Date} = queryValue;
      const { consentgroupid }: {consentgroupid : Date} = queryValue;
      const { requesturl }: {requesturl : Date} = queryValue;
      const { consenttype }: {consenttype : Date} = queryValue;
      const { status }: {status : Date} = queryValue;
      const { request }: {request : Date} = queryValue;
      const { consentbody }: {consentbody : Date} = queryValue;
      const { authorizationchannel }: {authorizationchannel : Date} = queryValue;
      const { interactionid }: {interactionid : Date} = queryValue;
      const { tpp }: {tpp : Date} = queryValue;
      const { updatedat }: {updatedat : number} = queryValue;
      const { parid }: {parid : Date} = queryValue;
      const { rartype }: {rartype : Date} = queryValue;
      const { standardversion }: {standardversion : Date} = queryValue;
      const { psuidentifiers }: {psuidentifiers : Date} = queryValue;
      const { accountids }: {accountids : Date} = queryValue;
      const { connecttoken }: {connecttoken : Date} = queryValue;
      const { account_id }: {account_id : Date} = queryValue;

      if(ids){ 
        query.ids = { [queryCondition['ids']]: ids };
      }
      if(consentgroupid){ 
        query.consentgroupid = { [queryCondition['consentgroupid']]: consentgroupid };
      }
      if(requesturl){ 
        query.requesturl = { [queryCondition['requesturl']]: requesturl };
      }
      if(consenttype){ 
        query.consenttype = { [queryCondition['consenttype']]: consenttype };
      }
      if(status){ 
        query.status = { [queryCondition['status']]: status };
      }
      if(request){ 
        query.request = { [queryCondition['request']]: request };
      }
      if(consentbody){ 
        query.consentbody = { [queryCondition['consentbody']]: consentbody };
      }
      if(authorizationchannel){ 
        query.authorizationchannel = { [queryCondition['authorizationchannel']]: authorizationchannel };
      }
      if(interactionid){ 
        query.interactionid = { [queryCondition['interactionid']]: interactionid };
      }
      if(tpp){ 
        query.tpp = { [queryCondition['tpp']]: tpp };
      }
      if(updatedat){ 
        query.updatedat = { [queryCondition['updatedat']]: updatedat };
      }
      if(parid){ 
        query.parid = { [queryCondition['parid']]: parid };
      }
      if(rartype){ 
        query.rartype = { [queryCondition['rartype']]: rartype };
      }
      if(standardversion){ 
        query.standardversion = { [queryCondition['standardversion']]: standardversion };
      }
      if(psuidentifiers){ 
        query.psuidentifiers = { [queryCondition['psuidentifiers']]: psuidentifiers };
      }
      if(accountids){ 
        query.accountids = { [queryCondition['accountids']]: accountids };
      }
      if(connecttoken){ 
        query.connecttoken = { [queryCondition['connecttoken']]: connecttoken };
      }
      if(account_id){ 
        query.account_id = { [queryCondition['account_id']]: account_id };
      }
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.tob_consent_request.findMany({
          select:Object.keys(columns).length >0 ?columns: undefined,
          where:Object.keys(query).length >0 ?query: undefined,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'tob_consent_request');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){

        const banks = await this.prismaService.tob_consent_request.findMany({
           select:Object.keys(columns).length >0 ? columns: undefined,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'tob_consent_request');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.tob_consent_request.findMany({
        select:Object.keys(columns).length >0 ? columns: undefined,
        where:Object.keys(query).length >0 ?query: undefined,
        skip: skip || undefined,
        take: limit || undefined,
      });

      const totalItems = await this.prismaService.tob_consent_request.count({
        where:Object.keys(query).length >0 ?query: undefined,
      });

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'tob_consent_request');
        decryptedRes.push(decryptedData);
      }
      return {
        items: decryptedRes,
        totalPages: Math.ceil(totalItems / limit),
      };
    } catch (error) {
      const errorMessage = 'Error in findAllmethod';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG020",
        errorMessage,
        "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

    async findOne(id:string,token : string) {
    try{
      const res = await this.prismaService.tob_consent_request.findUnique({ 
      where: {id,},
      select: {id:true,ids:true,consentgroupid:true,requesturl:true,consenttype:true,status:true,request:true,consentbody:true,authorizationchannel:true,interactionid:true,tpp:true,updatedat:true,parid:true,rartype:true,standardversion:true,psuidentifiers:true,accountids:true,connecttoken:true,account_id:true,tob_api_process_logs : true,
                  trs_created_date:true,
        trs_created_by:true,
        trs_modified_date:true,
        trs_modified_by:true,
        trs_process_id:true,
        trs_access_profile:true,
        trs_org_grp_code:true,
        trs_org_code:true,
        trs_role_grp_code:true,
        trs_role_code:true,
        trs_ps_grp_code:true,
        trs_ps_code:true,
        trs_sub_org_code:true,
        trs_sub_org_grp_code:true,
        trs_locked_by:true,
        trs_locked_time:true,
        trs_tenant_id:true,    
        trs_app_code:true,         
        trs_product_code:true,
        trs_event_process_status:true,         
        trs_event_status:true,
        }
    });
    return await this.decryptData(res, 'tob_consent_request');
  } catch (error) {
    const errorMessage = 'find one Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
  }
  }

  async findAll(token : string) {
    try{
      const res = await this.prismaService.tob_consent_request.findMany({ 
      select: {id:true,ids:true,consentgroupid:true,requesturl:true,consenttype:true,status:true,request:true,consentbody:true,authorizationchannel:true,interactionid:true,tpp:true,updatedat:true,parid:true,rartype:true,standardversion:true,psuidentifiers:true,accountids:true,connecttoken:true,account_id:true,tob_api_process_logs : true,
        trs_created_date:true,
        trs_created_by:true,
        trs_modified_date:true,
        trs_modified_by:true,
        trs_process_id:true,
        trs_access_profile:true,
        trs_org_grp_code:true,
        trs_org_code:true,
        trs_role_grp_code:true,
        trs_role_code:true,
        trs_ps_grp_code:true,
        trs_ps_code:true,
        trs_sub_org_code:true,
        trs_sub_org_grp_code:true,
        trs_locked_by:true,
        trs_locked_time:true,
        trs_tenant_id:true,    
        trs_app_code:true,         
        trs_product_code:true,
        trs_event_process_status:true,         
        trs_event_status:true,
      }
      });
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const decryptedData = await this.decryptData(indiviual, 'tob_consent_request');
        decryptedRes.push(decryptedData);
      }
      return decryptedRes;
    } catch (error) {
      const errorMessage = 'find All Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
          token
        );
      throw new CustomException(errorMessage, error);
    }
    }
    
  async findAllwithquery(token : string,whereClause : Prisma.tob_consent_requestWhereInput) {
    try{
      whereClause = await this.encryptData(whereClause,'tob_consent_request','getAll')
      const res = await this.prismaService.tob_consent_request.findMany({ 
      where: whereClause,
      select: {id:true,ids:true,consentgroupid:true,requesturl:true,consenttype:true,status:true,request:true,consentbody:true,authorizationchannel:true,interactionid:true,tpp:true,updatedat:true,parid:true,rartype:true,standardversion:true,psuidentifiers:true,accountids:true,connecttoken:true,account_id:true,tob_api_process_logs : true,
trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
      });
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const decryptedData = await this.decryptData(indiviual, 'tob_consent_request');
        decryptedRes.push(decryptedData);
      }
      return decryptedRes;
    } catch (error) {
      const errorMessage = 'find All Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }
    }
    
  async create(createtob_consent_requestDto: Prisma.tob_consent_requestCreateInput,token:string) {
    try{
      const res = await this.prismaService.tob_consent_request.create({ 
      data: await this.encryptData(createtob_consent_requestDto,'tob_consent_request','create'), 
      select:{id:true,ids:true,consentgroupid:true,requesturl:true,consenttype:true,status:true,request:true,consentbody:true,authorizationchannel:true,interactionid:true,tpp:true,updatedat:true,parid:true,rartype:true,standardversion:true,psuidentifiers:true,accountids:true,connecttoken:true,account_id:true,tob_api_process_logs : true,
trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true}
    })
    return await this.decryptData(res, 'tob_consent_request');
  } catch (error) {
    const errMsg = parsePrismaCreateError(error);

    await this.commonService.errorLog(
      "Technical",
      'AK',
      'Fatal',
      "TG022",
      errMsg.message,
      "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
      token

    );
    throw new InternalServerErrorException(errMsg.message);
  }
    
  }

    async update(id:string,updatetob_consent_requestDto: Prisma.tob_consent_requestUpdateInput,token:string) {    
      try{
      const res = await this.prismaService.tob_consent_request.update({
      where: {id,},
      data: await this.encryptData(updatetob_consent_requestDto,'tob_consent_request','update'),
      select: {id:true,ids:true,consentgroupid:true,requesturl:true,consenttype:true,status:true,request:true,consentbody:true,authorizationchannel:true,interactionid:true,tpp:true,updatedat:true,parid:true,rartype:true,standardversion:true,psuidentifiers:true,accountids:true,connecttoken:true,account_id:true,tob_api_process_logs : true,
trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
    });
    return await this.decryptData(res, 'tob_consent_request');
    } catch (error) {
        const errorMessage = 'update Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }    
}

    async remove(id:string,token : string) {
    try{
      const res = await this.prismaService.tob_consent_request.delete({
      where: {id, },
      select: {id:true,ids:true,consentgroupid:true,requesturl:true,consenttype:true,status:true,request:true,consentbody:true,authorizationchannel:true,interactionid:true,tpp:true,updatedat:true,parid:true,rartype:true,standardversion:true,psuidentifiers:true,accountids:true,connecttoken:true,account_id:true,tob_api_process_logs : true,
trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
    });
    return res;
  } catch (error) {
    const errorMessage = 'Error in remove Data';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG026",
        error,
        "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }
  async findFirst(token : string) {
    try{
      const res = await this.prismaService.tob_consent_request.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      });
      return  await this.decryptData(res, 'tob_consent_request');
    } catch (error) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
  async findLast(token : string) {
    try{
      const res = await this.prismaService.tob_consent_request.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      });
      return  await this.decryptData(res, 'tob_consent_request');
    } catch (error) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-MSD:CATK:Trs:AFGK:TOB:AFK:TOB_LFI_Consents:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
}