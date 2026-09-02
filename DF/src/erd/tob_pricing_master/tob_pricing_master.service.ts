
import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CommonService } from 'src/common.Service';
import { CustomException } from 'src/customException';
import { parsePrismaCreateError } from 'src/prisma-error-handler';



@Injectable()
export class tob_pricing_masterService {
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
      pricing_id:"number",
      tier_name:"string",
      api_call_min:"number",
      api_call_max:"number",
      monthly_fee:"number",
      price_per_call:"number",
      overage_price_per_call:"number",
      tpp_limit:"number",
      currency:"string",
      status:"string",
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
      const { pricing_id }: {pricing_id : number} = queryValue;
      const { tier_name }: {tier_name : Date} = queryValue;
      const { api_call_min }: {api_call_min : number} = queryValue;
      const { api_call_max }: {api_call_max : number} = queryValue;
      const { monthly_fee }: {monthly_fee : Date} = queryValue;
      const { price_per_call }: {price_per_call : Date} = queryValue;
      const { overage_price_per_call }: {overage_price_per_call : Date} = queryValue;
      const { tpp_limit }: {tpp_limit : number} = queryValue;
      const { currency }: {currency : Date} = queryValue;
      const { status }: {status : Date} = queryValue;

      if(pricing_id){ 
        query.pricing_id = { [queryCondition['pricing_id']]: pricing_id };
      }
      if(tier_name){ 
        query.tier_name = { [queryCondition['tier_name']]: tier_name };
      }
      if(api_call_min){ 
        query.api_call_min = { [queryCondition['api_call_min']]: api_call_min };
      }
      if(api_call_max){ 
        query.api_call_max = { [queryCondition['api_call_max']]: api_call_max };
      }
      if(monthly_fee){ 
        query.monthly_fee = { [queryCondition['monthly_fee']]: monthly_fee };
      }
      if(price_per_call){ 
        query.price_per_call = { [queryCondition['price_per_call']]: price_per_call };
      }
      if(overage_price_per_call){ 
        query.overage_price_per_call = { [queryCondition['overage_price_per_call']]: overage_price_per_call };
      }
      if(tpp_limit){ 
        query.tpp_limit = { [queryCondition['tpp_limit']]: tpp_limit };
      }
      if(currency){ 
        query.currency = { [queryCondition['currency']]: currency };
      }
      if(status){ 
        query.status = { [queryCondition['status']]: status };
      }
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.tob_pricing_master.findMany({
          select:Object.keys(columns).length >0 ?columns: undefined,
          where:Object.keys(query).length >0 ?query: undefined,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'tob_pricing_master');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){

        const banks = await this.prismaService.tob_pricing_master.findMany({
           select:Object.keys(columns).length >0 ? columns: undefined,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'tob_pricing_master');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.tob_pricing_master.findMany({
        select:Object.keys(columns).length >0 ? columns: undefined,
        where:Object.keys(query).length >0 ?query: undefined,
        skip: skip || undefined,
        take: limit || undefined,
      });

      const totalItems = await this.prismaService.tob_pricing_master.count({
        where:Object.keys(query).length >0 ?query: undefined,
      });

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'tob_pricing_master');
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
      const res = await this.prismaService.tob_pricing_master.findUnique({ 
      where: {id,},
      select: {id:true,pricing_id:true,tier_name:true,api_call_min:true,api_call_max:true,monthly_fee:true,price_per_call:true,overage_price_per_call:true,tpp_limit:true,currency:true,status:true,                  trs_created_date:true,
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
    return await this.decryptData(res, 'tob_pricing_master');
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
      const res = await this.prismaService.tob_pricing_master.findMany({ 
      select: {id:true,pricing_id:true,tier_name:true,api_call_min:true,api_call_max:true,monthly_fee:true,price_per_call:true,overage_price_per_call:true,tpp_limit:true,currency:true,status:true,        trs_created_date:true,
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
        const decryptedData = await this.decryptData(indiviual, 'tob_pricing_master');
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
    
  async findAllwithquery(token : string,whereClause : Prisma.tob_pricing_masterWhereInput) {
    try{
      whereClause = await this.encryptData(whereClause,'tob_pricing_master','getAll')
      const res = await this.prismaService.tob_pricing_master.findMany({ 
      where: whereClause,
      select: {id:true,pricing_id:true,tier_name:true,api_call_min:true,api_call_max:true,monthly_fee:true,price_per_call:true,overage_price_per_call:true,tpp_limit:true,currency:true,status:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
      });
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const decryptedData = await this.decryptData(indiviual, 'tob_pricing_master');
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
    
  async create(createtob_pricing_masterDto: Prisma.tob_pricing_masterCreateInput,token:string) {
    try{
      const res = await this.prismaService.tob_pricing_master.create({ 
      data: await this.encryptData(createtob_pricing_masterDto,'tob_pricing_master','create'), 
      select:{id:true,pricing_id:true,tier_name:true,api_call_min:true,api_call_max:true,monthly_fee:true,price_per_call:true,overage_price_per_call:true,tpp_limit:true,currency:true,status:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true}
    })
    return await this.decryptData(res, 'tob_pricing_master');
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

    async update(id:string,updatetob_pricing_masterDto: Prisma.tob_pricing_masterUpdateInput,token:string) {    
      try{
      const res = await this.prismaService.tob_pricing_master.update({
      where: {id,},
      data: await this.encryptData(updatetob_pricing_masterDto,'tob_pricing_master','update'),
      select: {id:true,pricing_id:true,tier_name:true,api_call_min:true,api_call_max:true,monthly_fee:true,price_per_call:true,overage_price_per_call:true,tpp_limit:true,currency:true,status:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
    });
    return await this.decryptData(res, 'tob_pricing_master');
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
      const res = await this.prismaService.tob_pricing_master.delete({
      where: {id, },
      select: {id:true,pricing_id:true,tier_name:true,api_call_min:true,api_call_max:true,monthly_fee:true,price_per_call:true,overage_price_per_call:true,tpp_limit:true,currency:true,status:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true},
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
      const res = await this.prismaService.tob_pricing_master.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      });
      return  await this.decryptData(res, 'tob_pricing_master');
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
      const res = await this.prismaService.tob_pricing_master.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      });
      return  await this.decryptData(res, 'tob_pricing_master');
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