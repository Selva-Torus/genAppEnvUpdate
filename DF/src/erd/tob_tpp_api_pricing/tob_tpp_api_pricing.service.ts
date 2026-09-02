
import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CommonService } from 'src/common.Service';
import { CustomException } from 'src/customException';
import { parsePrismaCreateError } from 'src/prisma-error-handler';



@Injectable()
export class tob_tpp_api_pricingService {
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
      record_id:"string",
      tpp_id:"string",
      tpp_name:"string",
      api_type:"string",
      api_name:"string",
      total_calls:"number",
      successful_calls:"number",
      billable_calls:"number",
      pricing_id:"string",
      base_fee:"number",
      usage_charge:"number",
      overage_charge:"number",
      total_charge:"number",
      billing_month:"Date",
      currency:"string",
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
      const { record_id }: {record_id : Date} = queryValue;
      const { tpp_id }: {tpp_id : Date} = queryValue;
      const { tpp_name }: {tpp_name : Date} = queryValue;
      const { api_type }: {api_type : Date} = queryValue;
      const { api_name }: {api_name : Date} = queryValue;
      const { total_calls }: {total_calls : number} = queryValue;
      const { successful_calls }: {successful_calls : number} = queryValue;
      const { billable_calls }: {billable_calls : number} = queryValue;
      const { pricing_id }: {pricing_id : Date} = queryValue;
      const { base_fee }: {base_fee : Date} = queryValue;
      const { usage_charge }: {usage_charge : Date} = queryValue;
      const { overage_charge }: {overage_charge : Date} = queryValue;
      const { total_charge }: {total_charge : Date} = queryValue;
      const { billing_month }: {billing_month :  Date} = queryValue;
      const { currency }: {currency : Date} = queryValue;

      if(record_id){ 
        query.record_id = { [queryCondition['record_id']]: record_id };
      }
      if(tpp_id){ 
        query.tpp_id = { [queryCondition['tpp_id']]: tpp_id };
      }
      if(tpp_name){ 
        query.tpp_name = { [queryCondition['tpp_name']]: tpp_name };
      }
      if(api_type){ 
        query.api_type = { [queryCondition['api_type']]: api_type };
      }
      if(api_name){ 
        query.api_name = { [queryCondition['api_name']]: api_name };
      }
      if(total_calls){ 
        query.total_calls = { [queryCondition['total_calls']]: total_calls };
      }
      if(successful_calls){ 
        query.successful_calls = { [queryCondition['successful_calls']]: successful_calls };
      }
      if(billable_calls){ 
        query.billable_calls = { [queryCondition['billable_calls']]: billable_calls };
      }
      if(pricing_id){ 
        query.pricing_id = { [queryCondition['pricing_id']]: pricing_id };
      }
      if(base_fee){ 
        query.base_fee = { [queryCondition['base_fee']]: base_fee };
      }
      if(usage_charge){ 
        query.usage_charge = { [queryCondition['usage_charge']]: usage_charge };
      }
      if(overage_charge){ 
        query.overage_charge = { [queryCondition['overage_charge']]: overage_charge };
      }
      if(total_charge){ 
        query.total_charge = { [queryCondition['total_charge']]: total_charge };
      }
      if(billing_month){ 
        query.billing_month = { [queryCondition['billing_month']]: billing_month };
      }
      if(currency){ 
        query.currency = { [queryCondition['currency']]: currency };
      }
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.tob_tpp_api_pricing.findMany({
          select:Object.keys(columns).length >0 ?columns: undefined,
          where:Object.keys(query).length >0 ?query: undefined,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'tob_tpp_api_pricing');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){

        const banks = await this.prismaService.tob_tpp_api_pricing.findMany({
           select:Object.keys(columns).length >0 ? columns: undefined,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'tob_tpp_api_pricing');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.tob_tpp_api_pricing.findMany({
        select:Object.keys(columns).length >0 ? columns: undefined,
        where:Object.keys(query).length >0 ?query: undefined,
        skip: skip || undefined,
        take: limit || undefined,
      });

      const totalItems = await this.prismaService.tob_tpp_api_pricing.count({
        where:Object.keys(query).length >0 ?query: undefined,
      });

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'tob_tpp_api_pricing');
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
      const res = await this.prismaService.tob_tpp_api_pricing.findUnique({ 
      where: {id,},
      select: {id:true,record_id:true,tpp_id:true,tpp_name:true,api_type:true,api_name:true,total_calls:true,successful_calls:true,billable_calls:true,pricing_id:true,base_fee:true,usage_charge:true,overage_charge:true,total_charge:true,billing_month:true,currency:true,                  trs_created_date:true,
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
    return await this.decryptData(res, 'tob_tpp_api_pricing');
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
      const res = await this.prismaService.tob_tpp_api_pricing.findMany({ 
      select: {id:true,record_id:true,tpp_id:true,tpp_name:true,api_type:true,api_name:true,total_calls:true,successful_calls:true,billable_calls:true,pricing_id:true,base_fee:true,usage_charge:true,overage_charge:true,total_charge:true,billing_month:true,currency:true,        trs_created_date:true,
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
        const decryptedData = await this.decryptData(indiviual, 'tob_tpp_api_pricing');
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
    
  async findAllwithquery(token : string,whereClause : Prisma.tob_tpp_api_pricingWhereInput) {
    try{
      whereClause = await this.encryptData(whereClause,'tob_tpp_api_pricing','getAll')
      const res = await this.prismaService.tob_tpp_api_pricing.findMany({ 
      where: whereClause,
      select: {id:true,record_id:true,tpp_id:true,tpp_name:true,api_type:true,api_name:true,total_calls:true,successful_calls:true,billable_calls:true,pricing_id:true,base_fee:true,usage_charge:true,overage_charge:true,total_charge:true,billing_month:true,currency:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
      });
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const decryptedData = await this.decryptData(indiviual, 'tob_tpp_api_pricing');
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
    
  async create(createtob_tpp_api_pricingDto: Prisma.tob_tpp_api_pricingCreateInput,token:string) {
    try{
      const res = await this.prismaService.tob_tpp_api_pricing.create({ 
      data: await this.encryptData(createtob_tpp_api_pricingDto,'tob_tpp_api_pricing','create'), 
      select:{id:true,record_id:true,tpp_id:true,tpp_name:true,api_type:true,api_name:true,total_calls:true,successful_calls:true,billable_calls:true,pricing_id:true,base_fee:true,usage_charge:true,overage_charge:true,total_charge:true,billing_month:true,currency:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true}
    })
    return await this.decryptData(res, 'tob_tpp_api_pricing');
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

    async update(id:string,updatetob_tpp_api_pricingDto: Prisma.tob_tpp_api_pricingUpdateInput,token:string) {    
      try{
      const res = await this.prismaService.tob_tpp_api_pricing.update({
      where: {id,},
      data: await this.encryptData(updatetob_tpp_api_pricingDto,'tob_tpp_api_pricing','update'),
      select: {id:true,record_id:true,tpp_id:true,tpp_name:true,api_type:true,api_name:true,total_calls:true,successful_calls:true,billable_calls:true,pricing_id:true,base_fee:true,usage_charge:true,overage_charge:true,total_charge:true,billing_month:true,currency:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
    });
    return await this.decryptData(res, 'tob_tpp_api_pricing');
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
      const res = await this.prismaService.tob_tpp_api_pricing.delete({
      where: {id, },
      select: {id:true,record_id:true,tpp_id:true,tpp_name:true,api_type:true,api_name:true,total_calls:true,successful_calls:true,billable_calls:true,pricing_id:true,base_fee:true,usage_charge:true,overage_charge:true,total_charge:true,billing_month:true,currency:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
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
      const res = await this.prismaService.tob_tpp_api_pricing.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      });
      return  await this.decryptData(res, 'tob_tpp_api_pricing');
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
      const res = await this.prismaService.tob_tpp_api_pricing.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      });
      return  await this.decryptData(res, 'tob_tpp_api_pricing');
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