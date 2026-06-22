

import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { ams_assetsEntity } from './entity/ams_assets.entity';
import { CustomException } from 'src/customException';
@Injectable()
export class ams_assetsService {
  constructor(private readonly prismaService: PrismaService,
  private readonly commonService: CommonService) {}
  private encryptedCols: any={
  "ams_asset_assignments": [],
  "ams_asset_categories": [
    {
      "column": "ams_assets",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "ams_asset_disposal": [],
  "ams_asset_maintenance": [],
  "ams_assets": [
    {
      "column": "ams_asset_assignments",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ams_asset_maintenance",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ams_asset_disposal",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ams_software_licenses",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "ams_license_allocations": [],
  "ams_software_licenses": [
    {
      "column": "ams_license_allocations",
      "isRequired": true,
      "dataType": "childtable"
    }
  ]
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

  async commonDecimalDatahandle(data:any){
    const plainData = { ...data,
       purchase_cost:data?.purchase_cost != null ? Number(data?.purchase_cost?.toString()) : null,
       purchase_value:data?.purchase_value != null ? Number(data?.purchase_value?.toString()) : null,
       current_value:data?.current_value != null ? Number(data?.current_value?.toString()) : null,
       depreciation_rate:data?.depreciation_rate != null ? Number(data?.depreciation_rate?.toString()) : null,
       salvage_value:data?.salvage_value != null ? Number(data?.salvage_value?.toString()) : null,
      }
    return plainData
  }
  private tzMap: Record<string, string> = {
    IST: 'Asia/Kolkata',
    CET: 'Europe/Paris',
    JST: 'Asia/Tokyo',
    AEDT: 'Australia/Sydney',
    NZDT: 'Pacific/Auckland',
    UTC: 'UTC',
    EST: 'America/New_York',
    PST: 'America/Los_Angeles',
    GMT: 'Etc/GMT',
    CST: 'America/Chicago',
    MST: 'America/Denver',
    BST: 'Europe/London',
    SGT: 'Asia/Singapore',
    AEST: 'Australia/Sydney',
  };

  private convertToTimezone(date: Date): string {
    const tz = process.env.TIMEZONE || 'UTC';
    const ianaTimezone = this.tzMap[tz] || 'UTC';
    return this.formatInTimezone(date, ianaTimezone);
  }

  private formatInTimezone(date: Date, ianaTimezone: string): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: ianaTimezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      fractionalSecondDigits: 3,
    } as any);

    const p: Record<string, string> = {};
    for (const { type, value } of formatter.formatToParts(date)) p[type] = value;
    const hour = p.hour === '24' ? '00' : p.hour;

    // Resolve the UTC offset for the given date and timezone
    const offsetParts = new Intl.DateTimeFormat('en-US', {
      timeZone: ianaTimezone,
      timeZoneName: 'shortOffset',
    }).formatToParts(date);
    const offsetStr = offsetParts.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT';

    let offset: string;
    if (offsetStr === 'GMT' || ianaTimezone === 'UTC') {
      offset = 'Z';
    } else {
      // Some ICU/Intl builds render the negative sign as U+2212 (MINUS SIGN)
      // instead of the ASCII hyphen, which the original regex missed.
      const match = offsetStr.match(/GMT([+\-−])(\d{1,2})(?::(\d{2}))?/);
      if (match) {
        const sign = match[1] === '+' ? '+' : '-';
        const hh = match[2].padStart(2, '0');
        const mm = (match[3] ?? '00').padStart(2, '0');
        offset = `${sign}${hh}:${mm}`;
      } else {
        offset = 'Z';
      }
    }

    return `${p.year}-${p.month}-${p.day}T${hour}:${p.minute}:${p.second}.${p.fractionalSecond}${offset}`;
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
        if (encryptedData[key] instanceof Prisma.Decimal) {
          encryptedData[key] = Number(encryptedData[key].toString());
          continue;
        }
        if (encryptedData[key] instanceof Date) {
          encryptedData[key] = this.convertToTimezone(encryptedData[key]);
          continue;
        }
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
            asset_id:"bigint",
            ci_id:"bigint",
            asset_tag:"string",
            asset_code:"string",
            asset_name:"string",
            description:"string",
            serial_number:"string",
            model_number:"string",
            manufacturer:"string",
            purchase_date:"Date",
            purchase_cost:"decimal",
            currency:"string",
            vendor_id:"bigint",
            warranty_expiry:"Date",
            warranty_status:"string",
            insurance_status:"string",
            asset_type:"string",
            classification:"string",
            data_classification:"string",
            ownership_type:"string",
            lifecycle_stage:"string",
            asset_condition:"string",
            is_critical:"boolean",
            compliance_status:"string",
            risk_level:"string",
            purchase_value:"decimal",
            current_value:"decimal",
            depreciation_rate:"decimal",
            salvage_value:"decimal",
            disposal_date:"Date",
            disposal_method:"string",
            disposal_ref:"string",
            asset_metadata:"json",
            additional_details:"json",
            doc_url:"string[]",
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
            trs_sub_org_grp_code:"string",
            trs_sub_org_code:"string",
            trs_locked_by:"string",
            trs_locked_time:"Date",
            trs_tenant_id:"string",
            trs_app_code:"string",
            trs_product_code:"string",
            trs_event_process_status:"string",
            trs_event_status:"string",
            trs_token_id:"string",
            trs_version:"string",
      acat_id :"number",    }
    return data;
  }

 async findAllmethod(queryDto: any, limit:number,selectColumns:any,token:any) {
    try {
      let queryCondition:any ={}
      let queryValue:any = {}
      let columns:any = {}
      selectColumns.forEach(element => {
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
      const { asset_id }: {asset_id : bigint} = queryValue;
      const { ci_id }: {ci_id : bigint} = queryValue;
      const { asset_tag }: {asset_tag : string} = queryValue;
      const { asset_code }: {asset_code : string} = queryValue;
      const { asset_name }: {asset_name : string} = queryValue;
      const { description }: {description : string} = queryValue;
      const { serial_number }: {serial_number : string} = queryValue;
      const { model_number }: {model_number : string} = queryValue;
      const { manufacturer }: {manufacturer : string} = queryValue;
      const { purchase_date }: {purchase_date : any } = queryValue;
      const { purchase_cost }: {purchase_cost : Date} = queryValue;
      const { currency }: {currency : string} = queryValue;
      const { vendor_id }: {vendor_id : bigint} = queryValue;
      const { warranty_expiry }: {warranty_expiry : any } = queryValue;
      const { warranty_status }: {warranty_status : string} = queryValue;
      const { insurance_status }: {insurance_status : string} = queryValue;
      const { asset_type }: {asset_type : string} = queryValue;
      const { classification }: {classification : string} = queryValue;
      const { data_classification }: {data_classification : string} = queryValue;
      const { ownership_type }: {ownership_type : string} = queryValue;
      const { lifecycle_stage }: {lifecycle_stage : string} = queryValue;
      const { asset_condition }: {asset_condition : string} = queryValue;
      const { is_critical }: {is_critical : Date} = queryValue;
      const { compliance_status }: {compliance_status : string} = queryValue;
      const { risk_level }: {risk_level : string} = queryValue;
      const { purchase_value }: {purchase_value : Date} = queryValue;
      const { current_value }: {current_value : Date} = queryValue;
      const { depreciation_rate }: {depreciation_rate : Date} = queryValue;
      const { salvage_value }: {salvage_value : Date} = queryValue;
      const { disposal_date }: {disposal_date : any } = queryValue;
      const { disposal_method }: {disposal_method : string} = queryValue;
      const { disposal_ref }: {disposal_ref : string} = queryValue;
      const { asset_metadata }: {asset_metadata : any } = queryValue;
      const { additional_details }: {additional_details : any } = queryValue;
      const { doc_url }: {doc_url : Date} = queryValue;
      const { trs_created_date }: {trs_created_date :  Date} = queryValue;
      const { trs_created_by }: {trs_created_by : string} = queryValue;
      const { trs_modified_date }: {trs_modified_date :  Date} = queryValue;
      const { trs_modified_by }: {trs_modified_by : string} = queryValue;
      const { trs_process_id }: {trs_process_id : string} = queryValue;
      const { trs_access_profile }: {trs_access_profile : string} = queryValue;
      const { trs_org_grp_code }: {trs_org_grp_code : string} = queryValue;
      const { trs_org_code }: {trs_org_code : string} = queryValue;
      const { trs_role_grp_code }: {trs_role_grp_code : string} = queryValue;
      const { trs_role_code }: {trs_role_code : string} = queryValue;
      const { trs_ps_grp_code }: {trs_ps_grp_code : string} = queryValue;
      const { trs_ps_code }: {trs_ps_code : string} = queryValue;
      const { trs_sub_org_grp_code }: {trs_sub_org_grp_code : string} = queryValue;
      const { trs_sub_org_code }: {trs_sub_org_code : string} = queryValue;
      const { trs_locked_by }: {trs_locked_by : string} = queryValue;
      const { trs_locked_time }: {trs_locked_time :  Date} = queryValue;
      const { trs_tenant_id }: {trs_tenant_id : string} = queryValue;
      const { trs_app_code }: {trs_app_code : string} = queryValue;
      const { trs_product_code }: {trs_product_code : string} = queryValue;
      const { trs_event_process_status }: {trs_event_process_status : string} = queryValue;
      const { trs_event_status }: {trs_event_status : string} = queryValue;
      const { trs_token_id }: {trs_token_id : string} = queryValue;
      const { trs_version }: {trs_version : string} = queryValue;

      if(asset_id){ 
        query.asset_id = { [queryCondition['asset_id']]: asset_id };
      }
      if(ci_id){ 
        query.ci_id = { [queryCondition['ci_id']]: ci_id };
      }
      if(asset_tag){ 
        query.asset_tag = { [queryCondition['asset_tag']]: asset_tag };
      }
      if(asset_code){ 
        query.asset_code = { [queryCondition['asset_code']]: asset_code };
      }
      if(asset_name){ 
        query.asset_name = { [queryCondition['asset_name']]: asset_name };
      }
      if(description){ 
        query.description = { [queryCondition['description']]: description };
      }
      if(serial_number){ 
        query.serial_number = { [queryCondition['serial_number']]: serial_number };
      }
      if(model_number){ 
        query.model_number = { [queryCondition['model_number']]: model_number };
      }
      if(manufacturer){ 
        query.manufacturer = { [queryCondition['manufacturer']]: manufacturer };
      }
      if(purchase_date){ 
        query.purchase_date = { [queryCondition['purchase_date']]: purchase_date };
      }
      if(purchase_cost){ 
        query.purchase_cost = { [queryCondition['purchase_cost']]: purchase_cost };
      }
      if(currency){ 
        query.currency = { [queryCondition['currency']]: currency };
      }
      if(vendor_id){ 
        query.vendor_id = { [queryCondition['vendor_id']]: vendor_id };
      }
      if(warranty_expiry){ 
        query.warranty_expiry = { [queryCondition['warranty_expiry']]: warranty_expiry };
      }
      if(warranty_status){ 
        query.warranty_status = { [queryCondition['warranty_status']]: warranty_status };
      }
      if(insurance_status){ 
        query.insurance_status = { [queryCondition['insurance_status']]: insurance_status };
      }
      if(asset_type){ 
        query.asset_type = { [queryCondition['asset_type']]: asset_type };
      }
      if(classification){ 
        query.classification = { [queryCondition['classification']]: classification };
      }
      if(data_classification){ 
        query.data_classification = { [queryCondition['data_classification']]: data_classification };
      }
      if(ownership_type){ 
        query.ownership_type = { [queryCondition['ownership_type']]: ownership_type };
      }
      if(lifecycle_stage){ 
        query.lifecycle_stage = { [queryCondition['lifecycle_stage']]: lifecycle_stage };
      }
      if(asset_condition){ 
        query.asset_condition = { [queryCondition['asset_condition']]: asset_condition };
      }
      if(is_critical){ 
        query.is_critical = { [queryCondition['is_critical']]: is_critical };
      }
      if(compliance_status){ 
        query.compliance_status = { [queryCondition['compliance_status']]: compliance_status };
      }
      if(risk_level){ 
        query.risk_level = { [queryCondition['risk_level']]: risk_level };
      }
      if(purchase_value){ 
        query.purchase_value = { [queryCondition['purchase_value']]: purchase_value };
      }
      if(current_value){ 
        query.current_value = { [queryCondition['current_value']]: current_value };
      }
      if(depreciation_rate){ 
        query.depreciation_rate = { [queryCondition['depreciation_rate']]: depreciation_rate };
      }
      if(salvage_value){ 
        query.salvage_value = { [queryCondition['salvage_value']]: salvage_value };
      }
      if(disposal_date){ 
        query.disposal_date = { [queryCondition['disposal_date']]: disposal_date };
      }
      if(disposal_method){ 
        query.disposal_method = { [queryCondition['disposal_method']]: disposal_method };
      }
      if(disposal_ref){ 
        query.disposal_ref = { [queryCondition['disposal_ref']]: disposal_ref };
      }
      if(asset_metadata){ 
        query.asset_metadata = { [queryCondition['asset_metadata']]: asset_metadata };
      }
      if(additional_details){ 
        query.additional_details = { [queryCondition['additional_details']]: additional_details };
      }
      if(doc_url){ 
        query.doc_url = { [queryCondition['doc_url']]: doc_url };
      }
      if(trs_created_date){ 
        query.trs_created_date = { [queryCondition['trs_created_date']]: trs_created_date };
      }
      if(trs_created_by){ 
        query.trs_created_by = { [queryCondition['trs_created_by']]: trs_created_by };
      }
      if(trs_modified_date){ 
        query.trs_modified_date = { [queryCondition['trs_modified_date']]: trs_modified_date };
      }
      if(trs_modified_by){ 
        query.trs_modified_by = { [queryCondition['trs_modified_by']]: trs_modified_by };
      }
      if(trs_process_id){ 
        query.trs_process_id = { [queryCondition['trs_process_id']]: trs_process_id };
      }
      if(trs_access_profile){ 
        query.trs_access_profile = { [queryCondition['trs_access_profile']]: trs_access_profile };
      }
      if(trs_org_grp_code){ 
        query.trs_org_grp_code = { [queryCondition['trs_org_grp_code']]: trs_org_grp_code };
      }
      if(trs_org_code){ 
        query.trs_org_code = { [queryCondition['trs_org_code']]: trs_org_code };
      }
      if(trs_role_grp_code){ 
        query.trs_role_grp_code = { [queryCondition['trs_role_grp_code']]: trs_role_grp_code };
      }
      if(trs_role_code){ 
        query.trs_role_code = { [queryCondition['trs_role_code']]: trs_role_code };
      }
      if(trs_ps_grp_code){ 
        query.trs_ps_grp_code = { [queryCondition['trs_ps_grp_code']]: trs_ps_grp_code };
      }
      if(trs_ps_code){ 
        query.trs_ps_code = { [queryCondition['trs_ps_code']]: trs_ps_code };
      }
      if(trs_sub_org_grp_code){ 
        query.trs_sub_org_grp_code = { [queryCondition['trs_sub_org_grp_code']]: trs_sub_org_grp_code };
      }
      if(trs_sub_org_code){ 
        query.trs_sub_org_code = { [queryCondition['trs_sub_org_code']]: trs_sub_org_code };
      }
      if(trs_locked_by){ 
        query.trs_locked_by = { [queryCondition['trs_locked_by']]: trs_locked_by };
      }
      if(trs_locked_time){ 
        query.trs_locked_time = { [queryCondition['trs_locked_time']]: trs_locked_time };
      }
      if(trs_tenant_id){ 
        query.trs_tenant_id = { [queryCondition['trs_tenant_id']]: trs_tenant_id };
      }
      if(trs_app_code){ 
        query.trs_app_code = { [queryCondition['trs_app_code']]: trs_app_code };
      }
      if(trs_product_code){ 
        query.trs_product_code = { [queryCondition['trs_product_code']]: trs_product_code };
      }
      if(trs_event_process_status){ 
        query.trs_event_process_status = { [queryCondition['trs_event_process_status']]: trs_event_process_status };
      }
      if(trs_event_status){ 
        query.trs_event_status = { [queryCondition['trs_event_status']]: trs_event_status };
      }
      if(trs_token_id){ 
        query.trs_token_id = { [queryCondition['trs_token_id']]: trs_token_id };
      }
      if(trs_version){ 
        query.trs_version = { [queryCondition['trs_version']]: trs_version };
      }
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.ams_assets.findMany({
          select:columns,
          where: query,          
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'ams_assets');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.ams_assets.findMany({
          select:columns,
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'ams_assets');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({
        select:columns,
        where: query,
        skip: skip,
        take: limit,
      }));

      const totalItems = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.count({
        where: query,
      }));

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'ams_assets');
        decryptedRes.push(decryptedData);
      }
      return {
        items: decryptedRes,
        totalPages: Math.ceil(totalItems / limit),
      };
    } catch (error:any) {
      const errorMessage = 'Error in findAllmethod';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG020",
        error,
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

  async findOne(asset_id:number,token : string) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({ 
      where: {asset_id},
      select: {asset_id:true,ci_id:true,asset_tag:true,asset_code:true,asset_name:true,description:true,serial_number:true,model_number:true,manufacturer:true,purchase_date:true,purchase_cost:true,currency:true,vendor_id:true,warranty_expiry:true,warranty_status:true,insurance_status:true,asset_type:true,classification:true,data_classification:true,ownership_type:true,lifecycle_stage:true,asset_condition:true,is_critical:true,compliance_status:true,risk_level:true,purchase_value:true,current_value:true,depreciation_rate:true,salvage_value:true,disposal_date:true,disposal_method:true,disposal_ref:true,asset_metadata:true,additional_details:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,acat_id :true,            ams_asset_assignments:{
              select:{
              assign_id:true,              assigned_to:true,              assigned_by:true,              assigned_at:true,              returned_at:true,              condition_at_assign:true,              condition_at_return:true,              assignment_status:true,              expected_return_date:true,              actual_return_date:true,              approved_by:true,              approval_status:true,              digital_signature:true,              assignment_notes:true,              notes:true,              acknowledgement_signed:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            ams_asset_maintenance:{
              select:{
              maint_id:true,              maint_type:true,              scheduled_date:true,              completed_date:true,              next_maintenance_date:true,              priority:true,              downtime_hours:true,              performed_by:true,              vendor_id:true,              vendor_reference:true,              cost:true,              description:true,              maintenance_checklist:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            ams_asset_disposal:{
              select:{
              disposal_id:true,              disposal_method:true,              reason:true,              approval_reference:true,              witness_name:true,              data_wiped:true,              data_wipe_method:true,              certificate_url:true,              disposal_date:true,              disposal_value:true,              disposal_cost:true,              resale_amount:true,              vendor_id:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            ams_software_licenses:{
              select:{
              license_id:true,              product_name:true,              vendor_id:true,              license_key:true,              license_type:true,              auto_renewal:true,              seats_total:true,              seats_used:true,              purchase_date:true,              expiry_date:true,              support_expiry:true,              cost:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
        }
    }));
    //return await this.decryptData(await this.commonDecimalDatahandle(res), 'ams_assets');
    let decryptedRes: any = [];
    for (const indiviual of res) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'ams_assets');
      decryptedRes.push(decryptedData);
    }
    return decryptedRes;
  } catch (error:any) {
    const errorMessage = 'Error in findOne';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG024",
        error,
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }

  async findAll(token : string
) {
    try{
      const whereClause: any = {};
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({ 
      where: whereClause,
      select: {asset_id:true,ci_id:true,asset_tag:true,asset_code:true,asset_name:true,description:true,serial_number:true,model_number:true,manufacturer:true,purchase_date:true,purchase_cost:true,currency:true,vendor_id:true,warranty_expiry:true,warranty_status:true,insurance_status:true,asset_type:true,classification:true,data_classification:true,ownership_type:true,lifecycle_stage:true,asset_condition:true,is_critical:true,compliance_status:true,risk_level:true,purchase_value:true,current_value:true,depreciation_rate:true,salvage_value:true,disposal_date:true,disposal_method:true,disposal_ref:true,asset_metadata:true,additional_details:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,          acat_id :true,    
          ams_asset_assignments:{
              select:{
              assign_id:true,              assigned_to:true,              assigned_by:true,              assigned_at:true,              returned_at:true,              condition_at_assign:true,              condition_at_return:true,              assignment_status:true,              expected_return_date:true,              actual_return_date:true,              approved_by:true,              approval_status:true,              digital_signature:true,              assignment_notes:true,              notes:true,              acknowledgement_signed:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          ams_asset_maintenance:{
              select:{
              maint_id:true,              maint_type:true,              scheduled_date:true,              completed_date:true,              next_maintenance_date:true,              priority:true,              downtime_hours:true,              performed_by:true,              vendor_id:true,              vendor_reference:true,              cost:true,              description:true,              maintenance_checklist:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          ams_asset_disposal:{
              select:{
              disposal_id:true,              disposal_method:true,              reason:true,              approval_reference:true,              witness_name:true,              data_wiped:true,              data_wipe_method:true,              certificate_url:true,              disposal_date:true,              disposal_value:true,              disposal_cost:true,              resale_amount:true,              vendor_id:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          ams_software_licenses:{
              select:{
              license_id:true,              product_name:true,              vendor_id:true,              license_key:true,              license_type:true,              auto_renewal:true,              seats_total:true,              seats_used:true,              purchase_date:true,              expiry_date:true,              support_expiry:true,              cost:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
      }
      }));
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'ams_assets');
        decryptedRes.push(decryptedData);
      }
      return decryptedRes;
    } catch (error:any) {
        const errorMessage = 'find All Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }
    }
    
  async create(createams_assetsDto: Prisma.ams_assetsCreateInput,token:string) {
    try{

      const dataSchema:any =  v.object({
            asset_id :v.number() , 
            ci_id :  v.optional(v.number()), 
            asset_tag :v.string() , 
            asset_code :  v.optional(v.string()), 
            asset_name :v.string() , 
            description :  v.optional(v.string()), 
            serial_number :  v.optional(v.string()), 
            model_number :  v.optional(v.string()), 
            manufacturer :  v.optional(v.string()), 
            purchase_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            purchase_cost :  v.optional(v.number()), 
            currency :v.string() , 
            vendor_id :  v.optional(v.number()), 
            warranty_expiry :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            warranty_status :  v.optional(v.string()), 
            insurance_status :  v.optional(v.string()), 
            asset_type :v.string() , 
            classification :v.string() , 
            data_classification :  v.optional(v.string()), 
            ownership_type :  v.optional(v.string()), 
            lifecycle_stage :  v.optional(v.string()), 
            asset_condition :  v.optional(v.string()), 
            is_critical :v.boolean()  , 
            compliance_status :  v.optional(v.string()), 
            risk_level :  v.optional(v.string()), 
            purchase_value :  v.optional(v.number()), 
            current_value :  v.optional(v.number()), 
            depreciation_rate :  v.optional(v.number()), 
            salvage_value :  v.optional(v.number()), 
            disposal_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            disposal_method :  v.optional(v.string()), 
            disposal_ref :  v.optional(v.string()), 
            asset_metadata :  v.optional(v.any() ), 
            additional_details :  v.optional(v.any() ), 
            doc_url :  v.optional(v.array(v.string())), 
            trs_created_date :(v.pipe(v.string(),v.isoDate()))  , 
            trs_created_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_modified_date :  v.optional((v.any())), 
            trs_modified_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_process_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_access_profile :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            trs_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_role_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_role_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_ps_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_ps_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_sub_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_sub_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_locked_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_locked_time :  v.optional((v.any())), 
            trs_tenant_id :v.pipe(v.string(),v.maxLength(16 )) , 
            trs_app_code :v.pipe(v.string(),v.maxLength(16 )) , 
            trs_product_code :v.pipe(v.string(),v.maxLength(16 )) , 
            trs_event_process_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_event_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
        });
        let validate : any = v.safeParse(dataSchema,createams_assetsDto);
        if (!validate.success) {
          let errorObj: errorObj = {
            tname: 'TG',
            errGrp: 'Data',
            fabric: 'DF',
            errType: 'Fatal',
            errCode: 'TG101',
          };
          const errorMessage = validate.issues[0].message;
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            errorMessage,
            "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
            token
          );
        }
      const encryptedData = await this.encryptData(createams_assetsDto, 'ams_assets', 'create');
      const res = await this.prismaService.withConnection(() =>
        this.prismaService.ams_assets.create({
          data: encryptedData,
          select:{asset_id:true,ci_id:true,asset_tag:true,asset_code:true,asset_name:true,description:true,serial_number:true,model_number:true,manufacturer:true,purchase_date:true,purchase_cost:true,currency:true,vendor_id:true,warranty_expiry:true,warranty_status:true,insurance_status:true,asset_type:true,classification:true,data_classification:true,ownership_type:true,lifecycle_stage:true,asset_condition:true,is_critical:true,compliance_status:true,risk_level:true,purchase_value:true,current_value:true,depreciation_rate:true,salvage_value:true,disposal_date:true,disposal_method:true,disposal_ref:true,asset_metadata:true,additional_details:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,acat_id :true,ams_asset_assignments:true,ams_asset_maintenance:true,ams_asset_disposal:true,ams_software_licenses:true,}          
        })
      );
    return await this.decryptData(await this.commonDecimalDatahandle(res), 'ams_assets');
  } catch (error:any) {
    const errMsg = parsePrismaCreateError(error);
    const errorMessage = 'Create Error';
    await this.commonService.errorLog(
      "Technical",
      'AK',
      'Fatal',
      "TG022",
      errMsg.message,
      "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
      token
    );
    throw new InternalServerErrorException(errMsg.message);
  }
    
  }

  // =====================================================
  // MAKER-CHECKER METHODS (JSON Parent-Child Process)
  // =====================================================
  //
  // Role-based routing:
  // - MAKER role: Calls request_change() to submit changes for approval
  // - CHECKER role: Calls approve_change() to approve pending requests
  // =====================================================

  /**
   * Create a new customer record through maker-checker approval flow.
   *
   * Role-based behavior:
   * - MAKER: Calls request_change() to submit INSERT request for approval
   * - CHECKER: Calls approve_change() to approve a pending INSERT request
   *
   * @param createcustomersDto - The customer data to create (for MAKER) or approval_id (for CHECKER)
   * @param userInfo - Contains role, username, and remarks
   * @param token - Auth token
   */
  async createMaster(
    createams_assetsDto: Prisma.ams_assetsCreateInput,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string, approvalId?: string },
    token: string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const approvalStatus = userInfo.approvalStatus?.toUpperCase();

      // =====================================================
      // CHECKER ROLE: Approve pending INSERT request
      // =====================================================
      if (role === 'CHECKER') {
        const approvalId = userInfo.approvalId;

        if (!approvalId) {
          throw new HttpException('approval_id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        if (approvalStatus === 'APPROVED') {
          // Call approve_change(approval_id, checker_id, checker_remarks)
          
          const result = await this.prismaService.withConnection(() =>
          this.prismaService.$queryRaw<any[]>`
            SELECT ct006_torus202610.approve_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `);
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'ams_assets creation approved and applied successfully',
              approval_id: approvalId,
              status: 'APPROVED'
            };
          } else {
            return {
              success: false,
              message: 'Approval failed - please check for version conflicts or missing records',
              approval_id: approvalId,
              status: 'FAILED'
            };
          }
                    
        }
        else if (approvalStatus === 'REJECTED') {
          // Call approve_change(approval_id, checker_id, checker_remarks)
          const result = await this.prismaService.withConnection(() =>
          this.prismaService.$queryRaw<any[]>`
            SELECT ct006_torus202610.reject_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `);
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'ams_assets creation rejected',
              approval_id: approvalId,
              status: 'REJECTED'
            };
          } else {
            return {
              success: false,
              message: 'Approval failed - please check for version conflicts or missing records',
              approval_id: approvalId,
              status: 'FAILED'
            };
          }
                    
        }
      }

      // =====================================================
      // MAKER ROLE: Submit INSERT request for approval
      // =====================================================
      // Validate the input data

      const dataSchema:any =  v.object({
            asset_id :v.number() , 
            ci_id :  v.optional(v.number()), 
            asset_tag :v.string() , 
            asset_code :  v.optional(v.string()), 
            asset_name :v.string() , 
            description :  v.optional(v.string()), 
            serial_number :  v.optional(v.string()), 
            model_number :  v.optional(v.string()), 
            manufacturer :  v.optional(v.string()), 
            purchase_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            purchase_cost :  v.optional(v.number()), 
            currency :v.string() , 
            vendor_id :  v.optional(v.number()), 
            warranty_expiry :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            warranty_status :  v.optional(v.string()), 
            insurance_status :  v.optional(v.string()), 
            asset_type :v.string() , 
            classification :v.string() , 
            data_classification :  v.optional(v.string()), 
            ownership_type :  v.optional(v.string()), 
            lifecycle_stage :  v.optional(v.string()), 
            asset_condition :  v.optional(v.string()), 
            is_critical :v.boolean()  , 
            compliance_status :  v.optional(v.string()), 
            risk_level :  v.optional(v.string()), 
            purchase_value :  v.optional(v.number()), 
            current_value :  v.optional(v.number()), 
            depreciation_rate :  v.optional(v.number()), 
            salvage_value :  v.optional(v.number()), 
            disposal_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            disposal_method :  v.optional(v.string()), 
            disposal_ref :  v.optional(v.string()), 
            asset_metadata :  v.optional(v.any() ), 
            additional_details :  v.optional(v.any() ), 
            doc_url :  v.optional(v.array(v.string())), 
            trs_created_date :(v.pipe(v.string(),v.isoDate()))  , 
            trs_created_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_modified_date :  v.optional((v.any())), 
            trs_modified_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_process_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_access_profile :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            trs_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_role_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_role_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_ps_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_ps_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_sub_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_sub_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            trs_locked_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_locked_time :  v.optional((v.any())), 
            trs_tenant_id :v.pipe(v.string(),v.maxLength(16 )) , 
            trs_app_code :v.pipe(v.string(),v.maxLength(16 )) , 
            trs_product_code :v.pipe(v.string(),v.maxLength(16 )) , 
            trs_event_process_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_event_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
        });
        let validate : any = v.safeParse(dataSchema,createams_assetsDto);
        if (!validate.success) {
          let errorObj: errorObj = {
            tname: 'TG',
            errGrp: 'Data',
            fabric: 'DF',
            errType: 'Fatal',
            errCode: 'TG101',
          };
          const errorMessage = validate.issues[0].message;
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            errorMessage,
            "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
            token
          );
          throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }
      
      // Encrypt data if needed
      const encryptedData = await this.encryptData(createams_assetsDto, 'ams_assets', 'create');
      encryptedData['trs_modified_date'] = new Date();

      // Convert numeric values to strings for JSONB (as per the documentation pattern)
      //const changes: Record<string, string> = {};
      //for (const [key, value] of Object.entries(encryptedData)) {
      //  if (value !== null && value !== undefined && key !== 'approval_id') {
      //    changes[key] = String(value);
      //  }
      //}
      if(role === 'MAKER')
      {
        
        const result = await this.prismaService.withConnection(() =>
        this.prismaService.$queryRaw<any[]>`
          SELECT ct006_torus202610.request_change(
            p_table_name     := 'ams_assets',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'asset_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct006_ams'
          ) AS approval_id
        `);

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'ams_assets creation request submitted for approval',
          approval_id: approvalId,
          status: 'CREATED'
        };
      }
      // Call request_change() for INSERT
      // For INSERT: p_record_id is NULL, p_changes contains the new data

    } catch (error: any) {
      const errorMessage = 'Error in createMaster';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG031",
        error,
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
        token
      );

      // Handle specific PostgreSQL errors
      if (error.message?.includes('Maker and checker cannot be the same')) {
        throw new HttpException('You cannot approve your own request', HttpStatus.FORBIDDEN);
      }
      if (error.message?.includes('Cannot approve record with status')) {
        throw new HttpException('This request has already been processed', HttpStatus.BAD_REQUEST);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new CustomException(errorMessage, error);
    }
  }

  async update(asset_id:number, updateams_assetsDto: Prisma.ams_assetsUpdateInput,token:string) {   
    try{

      const dataSchema:any =  v.object({
          ci_id :  v.optional(v.number()), 
          asset_tag :  v.optional(v.string()), 
          asset_code :  v.optional(v.string()), 
          asset_name :  v.optional(v.string()), 
          description :  v.optional(v.string()), 
          serial_number :  v.optional(v.string()), 
          model_number :  v.optional(v.string()), 
          manufacturer :  v.optional(v.string()), 
          purchase_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          purchase_cost :  v.optional(v.number()), 
          currency :  v.optional(v.string()), 
          vendor_id :  v.optional(v.number()), 
          warranty_expiry :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          warranty_status :  v.optional(v.string()), 
          insurance_status :  v.optional(v.string()), 
          asset_type :  v.optional(v.string()), 
          classification :  v.optional(v.string()), 
          data_classification :  v.optional(v.string()), 
          ownership_type :  v.optional(v.string()), 
          lifecycle_stage :  v.optional(v.string()), 
          asset_condition :  v.optional(v.string()), 
          is_critical :  v.optional(v.boolean()), 
          compliance_status :  v.optional(v.string()), 
          risk_level :  v.optional(v.string()), 
          purchase_value :  v.optional(v.number()), 
          current_value :  v.optional(v.number()), 
          depreciation_rate :  v.optional(v.number()), 
          salvage_value :  v.optional(v.number()), 
          disposal_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          disposal_method :  v.optional(v.string()), 
          disposal_ref :  v.optional(v.string()), 
          asset_metadata :  v.optional(v.any()), 
          additional_details :  v.optional(v.any()), 
          doc_url :  v.optional(v.array(v.string())), 
          trs_created_date :  v.optional((v.any())), 
          trs_created_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_modified_date :  v.optional((v.any())), 
          trs_modified_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_process_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_access_profile :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          trs_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_role_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_role_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_ps_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_ps_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_sub_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_sub_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_locked_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_locked_time :  v.optional((v.any())), 
          trs_tenant_id :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_app_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_product_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_event_process_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_event_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
      });
      let validate : any = v.safeParse(dataSchema,updateams_assetsDto);
      if (!validate.success) {
        let errorObj: errorObj = {
          tname: 'TG',
          errGrp: 'Data',
          fabric: 'DF',
          errType: 'Fatal',
          errCode: 'TG101',
        };
        const errorMessage = validate.issues[0].message;
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG025",
          errorMessage,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
          token
        );
      }
      const encryptedData = await this.encryptData(updateams_assetsDto,'ams_assets','update');
      await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.updateMany({
      where: {asset_id},
      data: encryptedData
    }));
    const updated = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({
      where: {asset_id},
      select: {asset_id:true,ci_id:true,asset_tag:true,asset_code:true,asset_name:true,description:true,serial_number:true,model_number:true,manufacturer:true,purchase_date:true,purchase_cost:true,currency:true,vendor_id:true,warranty_expiry:true,warranty_status:true,insurance_status:true,asset_type:true,classification:true,data_classification:true,ownership_type:true,lifecycle_stage:true,asset_condition:true,is_critical:true,compliance_status:true,risk_level:true,purchase_value:true,current_value:true,depreciation_rate:true,salvage_value:true,disposal_date:true,disposal_method:true,disposal_ref:true,asset_metadata:true,additional_details:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,acat_id :true,ams_asset_assignments:true,ams_asset_maintenance:true,ams_asset_disposal:true,ams_software_licenses:true,}
    }));
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'ams_assets');
    let decryptedRes: any = [];
    for (const indiviual of updated) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'ams_assets');
      decryptedRes.push(decryptedData);
    }
    return decryptedRes;
    } catch (error:any) {
        const errorMessage = 'update Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }  
}

/**
   * Update an existing customer record through maker-checker approval flow.
   *
   * Role-based behavior:
   * - MAKER: Calls request_change() to submit UPDATE request for approval
   * - CHECKER: Calls approve_change() to approve a pending UPDATE request
   *
   * @param id - The customer ID to update (for MAKER) or approval_id (for CHECKER with id=0)
   * @param updatecustomersDto - The updated customer data (for MAKER) or approval_id (for CHECKER)
   * @param userInfo - Contains role, username, and remarks
   * @param token - Auth token
   */
  async updateMaster(
asset_id:number,
    updateams_assetsDto: Prisma.ams_assetsUpdateInput,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const updateMaster_id =asset_id;

      // =====================================================
      // CHECKER ROLE: Approve pending UPDATE request
      // =====================================================
      if (role === 'CHECKER') {

        if (!updateMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        // const result = await this.prismaService.withConnection(() =>
        //this.prismaService.$queryRaw<any[]>`
        //   SELECT * FROM approve_change_by_record(
        //     'customers',
        //     ${approvalId},
        //     ${userInfo.username},
        //     ${userInfo.remarks || null}
        //   ) AS success
        // `);
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.prismaService.withConnection(() =>
        this.prismaService.$queryRaw<any[]>`
          SELECT * FROM ct006_torus202610.approve_change_by_record(
              p_table_name      := 'ams_assets',
              p_record_id       := ${updateMaster_id.toString()},
              p_checker_id      := ${userInfo.username},
              p_checker_remarks := ${userInfo.remarks || null}
          );
        `);

        const success = result[0]?.success;
        const approvalId = result[0]?.approval_id;

        if (success) {
          return {
            success: true,
            message: 'ams_assets update approved and applied successfully',
            approvalId: approvalId,
            record_id: updateMaster_id,
            status: 'APPROVED'
          };
        } else {
          return {
            success: false,
            message: 'Approval failed - please check for version conflicts or missing records',
            approvalId: approvalId,
            record_id: updateMaster_id,
            status: 'FAILED'
          };
        }
        }else if (userInfo.approvalStatus === 'REJECTED') {
          const result = await this.prismaService.withConnection(() =>
          this.prismaService.$queryRaw<any[]>`
            SELECT * FROM ct006_torus202610.reject_change_by_record(
                p_table_name      := 'ams_assets',
                p_record_id       := ${updateMaster_id.toString()},
                p_checker_id      := ${userInfo.username},
                p_checker_remarks := ${userInfo.remarks || null}
            );
          `);

          const success = result[0]?.success;
          const approvalId = result[0]?.approval_id;

          if (success) {
            return {
              success: true,
              message: 'ams_assets update rejected',
              approvalId: approvalId,
              record_id: updateMaster_id,
              status: 'REJECTED'
            };
          } else {
            return {
              success: false,
              message: 'Approval failed - please check for version conflicts or missing records',
              approvalId: approvalId,
              record_id: updateMaster_id,
              status: 'FAILED'
            };
          }
        }
      }

      // =====================================================
      // MAKER ROLE: Submit UPDATE request for approval
      // =====================================================
      // Validate the input data

      const dataSchema:any =  v.object({
          ci_id :  v.optional(v.number()), 
          asset_tag :  v.optional(v.string()), 
          asset_code :  v.optional(v.string()), 
          asset_name :  v.optional(v.string()), 
          description :  v.optional(v.string()), 
          serial_number :  v.optional(v.string()), 
          model_number :  v.optional(v.string()), 
          manufacturer :  v.optional(v.string()), 
          purchase_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          purchase_cost :  v.optional(v.number()), 
          currency :  v.optional(v.string()), 
          vendor_id :  v.optional(v.number()), 
          warranty_expiry :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          warranty_status :  v.optional(v.string()), 
          insurance_status :  v.optional(v.string()), 
          asset_type :  v.optional(v.string()), 
          classification :  v.optional(v.string()), 
          data_classification :  v.optional(v.string()), 
          ownership_type :  v.optional(v.string()), 
          lifecycle_stage :  v.optional(v.string()), 
          asset_condition :  v.optional(v.string()), 
          is_critical :  v.optional(v.boolean()), 
          compliance_status :  v.optional(v.string()), 
          risk_level :  v.optional(v.string()), 
          purchase_value :  v.optional(v.number()), 
          current_value :  v.optional(v.number()), 
          depreciation_rate :  v.optional(v.number()), 
          salvage_value :  v.optional(v.number()), 
          disposal_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          disposal_method :  v.optional(v.string()), 
          disposal_ref :  v.optional(v.string()), 
          asset_metadata :  v.optional(v.any()), 
          additional_details :  v.optional(v.any()), 
          doc_url :  v.optional(v.array(v.string())), 
          trs_created_date :  v.optional((v.any())), 
          trs_created_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_modified_date :  v.optional((v.any())), 
          trs_modified_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_process_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_access_profile :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          trs_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_role_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_role_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_ps_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_ps_code :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_sub_org_grp_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_sub_org_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_locked_by :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_locked_time :  v.optional((v.any())), 
          trs_tenant_id :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_app_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_product_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          trs_event_process_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_event_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
      });
      let validate : any = v.safeParse(dataSchema,updateams_assetsDto);
      if (!validate.success) {
        const errorMessage = validate.issues[0].message;
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG025",
          errorMessage,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
          token
        );
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }

      // Verify record exists
      const existingRecord = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({
        where: {asset_id}
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      const encryptedData = await this.encryptData(updateams_assetsDto, 'ams_assets', 'update');

      // Convert values to strings for JSONB (as per the documentation pattern)
      // Only include the fields that are being changed
      //const changes: Record<string, string> = {};
      //for (const [key, value] of Object.entries(encryptedData)) {
      //  if (value !== null && value !== undefined && key !== 'approval_id') {
      //    changes[key] = String(value);
      //  }
      //}

      // Call request_change() for UPDATE
      // For UPDATE: p_record_id is the ID, p_changes contains only changed fields
      const result = await this.prismaService.withConnection(() =>
      this.prismaService.$queryRaw<any[]>`
        SELECT ct006_torus202610.request_change(
          p_table_name     := 'ams_assets',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'asset_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct006_ams'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'ams_assets update request submitted for approval',
        approval_id: approvalId,
        record_id: updateMaster_id,
        status: 'CREATED'
      };
    } catch (error: any) {
      const errorMessage = 'Error in updateMaster';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG033",
        error,
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
        token
      );

      // Handle specific PostgreSQL errors
      if (error.message?.includes('Maker and checker cannot be the same')) {
        throw new HttpException('You cannot approve your own request', HttpStatus.FORBIDDEN);
      }
      if (error.message?.includes('Cannot approve record with status')) {
        throw new HttpException('This request has already been processed', HttpStatus.BAD_REQUEST);
      }
      if (error.message?.includes('pending request already exists')) {
        throw new HttpException('A pending request already exists for this record', HttpStatus.CONFLICT);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new CustomException(errorMessage, error);
    }
  }

  async remove(asset_id:number,token : string) {
    try{
    const toDelete = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({
      where: {asset_id},
      select: {asset_id:true,ci_id:true,asset_tag:true,asset_code:true,asset_name:true,description:true,serial_number:true,model_number:true,manufacturer:true,purchase_date:true,purchase_cost:true,currency:true,vendor_id:true,warranty_expiry:true,warranty_status:true,insurance_status:true,asset_type:true,classification:true,data_classification:true,ownership_type:true,lifecycle_stage:true,asset_condition:true,is_critical:true,compliance_status:true,risk_level:true,purchase_value:true,current_value:true,depreciation_rate:true,salvage_value:true,disposal_date:true,disposal_method:true,disposal_ref:true,asset_metadata:true,additional_details:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,acat_id :true,ams_asset_assignments:true,ams_asset_maintenance:true,ams_asset_disposal:true,ams_software_licenses:true,}
    })); 
    await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.deleteMany({
      where: {asset_id}
    })); 
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'ams_assets');
    let decryptedRes: any = [];
    for (const indiviual of toDelete) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'ams_assets');
      decryptedRes.push(decryptedData);
    }
    return decryptedRes;
  } catch (error:any) {
    const errorMessage = 'Error in remove Data';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG026",
        error,
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }
   /**
   * Delete a customer record through maker-checker approval flow.
   *
   * Role-based behavior:
   * - MAKER: Calls request_change() to submit DELETE request for approval
   * - CHECKER: Calls approve_change() to approve a pending DELETE request
   *
   * @param id - The customer ID to delete (for MAKER) or approval_id (for CHECKER)
   * @param userInfo - Contains role, username, remarks, and optionally approval_id
   * @param token - Auth token
   */
  async deleteMaster(
asset_id:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const deleteMaster_id =asset_id;

      // =====================================================
      // CHECKER ROLE: Approve pending DELETE request
      // =====================================================
      if (role === 'CHECKER') {

        if (!deleteMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.prismaService.withConnection(() =>
        this.prismaService.$queryRaw<any[]>`
          SELECT * FROM ct006_torus202610.approve_change_by_record(
              p_table_name      := 'ams_assets',
              p_record_id       := ${deleteMaster_id.toString()},
              p_checker_id      := ${userInfo.username},
              p_checker_remarks := ${userInfo.remarks || null}
          );
        `);

        const success = result[0]?.success;
        const approvalId = result[0]?.approval_id;

        if (success) {
          return {
            success: true,
            message: 'ams_assets deletion approved and applied successfully',
            approval_id: approvalId,
            record_id: deleteMaster_id,
            status: 'APPROVED'
          };
        } else {
          return {
            success: false,
            message: 'Approval failed - please check for version conflicts or missing records',
            approval_id: approvalId,
            record_id: deleteMaster_id,
            status: 'FAILED'
          };
        }
        }else if (userInfo.approvalStatus === 'REJECTED') {
          const result = await this.prismaService.withConnection(() =>
          this.prismaService.$queryRaw<any[]>`
            SELECT * FROM ct006_torus202610.reject_change_by_record(
                p_table_name      := 'ams_assets',
                p_record_id       := ${deleteMaster_id.toString()},
                p_checker_id      := ${userInfo.username},
                p_checker_remarks := ${userInfo.remarks || null}
            );
          `);

          const success = result[0]?.success;
          const approvalId = result[0]?.approval_id;

          if (success) {
            return {
              success: true,
              message: 'ams_assets deletion rejected',
              approval_id: approvalId,
              record_id: deleteMaster_id,
              status: 'REJECTED'
            };
          } else {
            return {
              success: false,
              message: 'Approval failed - please check for version conflicts or missing records',
              approval_id: approvalId,
              record_id: deleteMaster_id,
              status: 'FAILED'
            };
          }
        }
      }

      // =====================================================
      // MAKER ROLE: Submit DELETE request for approval
      // =====================================================
      // Verify record exists
      const existingRecord = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findMany({
        where: {asset_id  }
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.prismaService.withConnection(() =>
      this.prismaService.$queryRaw<any[]>`
        SELECT ct006_torus202610.request_change(
          p_table_name     := 'ams_assets',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'asset_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct006_ams'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'ams_assets deletion request submitted for approval',
        approval_id: approvalId,
        record_id: deleteMaster_id,
        status: 'CREATED'
      };
    } catch (error: any) {
      const errorMessage = 'Error in deleteMaster';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG034",
        error,
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
        token
      );

      // Handle specific PostgreSQL errors
      if (error.message?.includes('Maker and checker cannot be the same')) {
        throw new HttpException('You cannot approve your own request', HttpStatus.FORBIDDEN);
      }
      if (error.message?.includes('Cannot approve record with status')) {
        throw new HttpException('This request has already been processed', HttpStatus.BAD_REQUEST);
      }
      if (error.message?.includes('pending request already exists')) {
        throw new HttpException('A pending request already exists for this record', HttpStatus.CONFLICT);
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new CustomException(errorMessage, error);
    }
  }
  async findFirst(token : string) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      }));
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'ams_assets');
    } catch (error:any) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
  async findLast(token : string) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.ams_assets.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      }));
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'ams_assets');
    } catch (error:any) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:AMS:AFK:amsERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }

}
