import { HttpException, Injectable,HttpStatus,InternalServerErrorException,ConflictException,BadRequestException } from '@nestjs/common';
import { Createvgph_temp_stagingDto } from './dto/Createvgph_temp_staging.dto';
import { Updatevgph_temp_stagingDto } from './dto/Updatevgph_temp_staging.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CdcPrismaService } from '../cdc_prisma.service'; 
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { vgph_temp_stagingEntity } from './entity/vgph_temp_staging.entity';
import { CustomException, ForbiddenException, toHttpStatus } from 'src/customException';
import { JwtServices } from 'src/jwt.services';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { LockRecordDto } from 'src/dto';
import axios from 'axios';
import { OptimisticLockService } from 'src/optimistic-lock.service';
import { MAX_PAGE_SIZE, capTake } from 'src/pagination.util';
import { getModelFieldTypes } from 'src/utils/prisma-dmmf.util';
@Injectable()
export class vgph_temp_stagingService {
  constructor(private readonly prismaService: PrismaService,
  private readonly cdcPrismaService: CdcPrismaService,
  private readonly commonService: CommonService,
  private readonly jwtServices: JwtServices,
  private readonly ufservice: UfService,
  private readonly optimisticLockService: OptimisticLockService) {}
  private encryptedCols: any={
  "vgph_source_main": [],
  "vgph_source_tran_main": [],
  "vgph_tran_dtl_main": [],
  "vgph_tran_log_main": [],
  "vgph_tran_error_log_main": [],
  "vgph_destination_main": [],
  "vgph_destination_tran_main": [],
  "vgph_nf_tran_main": [],
  "vgph_process_exception_main": [],
  "vgph_temp_main": [],
  "vgph_trn_secure_token": [],
  "vgph_charge_tran": [],
  "vgph_source_corporate": [],
  "vgph_corporate": [],
  "vgph_source_employee": [],
  "vgph_employee": [],
  "vgph_source_si": [],
  "vgph_si": [],
  "vgph_corporate_relationship": [],
  "vgph_corporate_relationship_exception": [],
  "vgph_cob_error_log": [],
  "vgph_participant_bank": [],
  "vgph_participant_branch": [],
  "vgph_correspondent_bank": [],
  "vgph_correspondent_exception": [],
  "vgph_correspondent_nostro": [],
  "vgph_holiday": [],
  "vgph_clearing_holiday": [],
  "vgph_clearing_session": [],
  "vgph_participant_bank_status": [],
  "vgph_charge_setup": [],
  "vgph_charge_config": [],
  "vgph_charge_invoice": [],
  "vgph_beneficiary": [],
  "vgph_account_beneficiary": [],
  "vgph_source_staging": [],
  "vgph_source_tran_staging": [],
  "vgph_tran_dtl_staging": [],
  "vgph_destination_staging": [],
  "vgph_destination_tran_staging": [],
  "vgph_temp_staging": [],
  "wps_mohre_api_calls": [],
  "wps_mohre_employee_dtl": [],
  "wps_mohre_salary_dtl": [],
  "npss_customer_proxy": [],
  "npss_customer_accounts": [],
  "npss_customer_appid": [],
  "npss_merchant_proxy": [],
  "npss_merchant_appid": [],
  "npss_merchant_accounts": [],
  "npss_merchant_shops": [],
  "npss_merchant_cashdesk": [],
  "npss_sm_process_log": [],
  "npss_core_api_process_log": [],
  "npss_camt_account_report": [],
  "npss_camt_acc_crdr_ntfn": [],
  "npss_camt_acc_stmt": [],
  "npss_fe_api_logs": []
}
  private readonly tokenizationRules:any = {};    

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
      }
    return plainData
  }

  private async normalizeDatesToUTC(data: any, token: string): Promise<any> {
    const schema = await this.findSchema(token);
    const dateTimeFields = Object.entries(schema)
      .filter(([_, type]) => type === 'Date')
      .map(([name]) => name);

    const result = { ...data };
    for (const key of dateTimeFields) {
      if (!(key in result)) continue;
      if (result[key] instanceof Date) continue;
      if (typeof result[key] === 'string') {
        const d = new Date(result[key]);
        if (!isNaN(d.getTime())) {
          result[key] = d;
        }
      }
    }
    return result;
  }
  private convertToTimezone(date: Date): string {
    const ianaTimezone = process.env.TIMEZONE || 'UTC';
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
    
    return `${p.year}-${p.month}-${p.day} ${hour}:${p.minute}:${p.second}.${p.fractionalSecond}`; 
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
            vgphtsid:"bigint",
            prcts_uuid:"string",
            data_json:"json",
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
    }
    return data;
  }

 async findAllmethod(queryDto: any, limit:number, selectColumns:any, token:any, authContext?: any,sortingcolumns:any={}) {
  if (!authContext?.tenant) {
     throw new ForbiddenException('Tenant claim is missing from the token');
   }
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
      const { vgphtsid }: {vgphtsid : bigint} = queryValue;
      const { prcts_uuid }: {prcts_uuid : string} = queryValue;
      const { data_json }: {data_json : any } = queryValue;
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

      if(vgphtsid){ 
        query.vgphtsid = { [queryCondition['vgphtsid']]: vgphtsid };
      }
      if(prcts_uuid){ 
        query.prcts_uuid = { [queryCondition['prcts_uuid']]: prcts_uuid };
      }
      if(data_json){ 
        query.data_json = { [queryCondition['data_json']]: data_json };
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
      query.trs_tenant_id = authContext.tenant;
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.vgph_temp_staging.findMany({
          select:columns,
          where: query,
          orderBy:sortingcolumns||{},   
          // Hard cap — this branch previously returned every matching row,
          // unbounded, when the caller filtered but didn't paginate.
          take: MAX_PAGE_SIZE,         
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'vgph_temp_staging');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.vgph_temp_staging.findMany({
          select:columns,
          orderBy:sortingcolumns||{},
          // Hard cap — this branch previously returned the entire table,
          // unbounded, when the caller supplied neither a filter nor page/limit.
          take: MAX_PAGE_SIZE,
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'vgph_temp_staging');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findMany({
        select:columns,
        where: query,
        skip: skip,
        orderBy:sortingcolumns||{},
        // Capped — previously a caller could pass an arbitrarily large
        // limit and get the whole matching set in one page anyway.
        take: capTake(limit),
      }));

      const totalItems = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.count({
        where: query,
      }));

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'vgph_temp_staging');
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

  async findOne(vgphtsid:number,token : string,detokenize?: string,detokenizeData?: any,authContext?: any) {
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }
    try{
      const tenantFilter = { trs_tenant_id: authContext.tenant };
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findMany({ 
      where: {vgphtsid, ...tenantFilter },
      select: {vgphtsid:true,prcts_uuid:true,data_json:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,        }
    }));
    //return await this.decryptData(await this.commonDecimalDatahandle(res), 'vgph_temp_staging');
    let decryptedRes: any = [];
    for (const indiviual of res) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'vgph_temp_staging');
      decryptedRes.push(decryptedData);
    }
    if (this.tokenizationRules?.rules?.fields?.length > 0 && decryptedRes[0]?.trs_token_id && detokenize == 'true') {
        let deTokenizedData =  await axios.get(
            `${process.env.TOKENIZATION_BASE_URL}/detokenization/${decryptedRes[0]['trs_token_id']}`,
          )
        decryptedRes[0] = { ...decryptedRes[0], ...deTokenizedData?.data} ;
    }

    if (this.tokenizationRules?.rules?.fields?.length > 0 && decryptedRes[0]?.trs_token_id && Object.keys(detokenizeData).length > 0) {
      let getMaskedData: any = await axios.get(
          `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${decryptedRes[0]['trs_token_id']}`,
        )
      const maskedData = getMaskedData?.data;
      if (maskedData && typeof maskedData === 'object') {
        for (const key of Object.keys(maskedData)) {
          if (key in detokenizeData) {
            const maskValue = maskedData[key];
            if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
              decryptedRes[0][key] = maskValue[detokenizeData[key]];
            }
          }
        }
      }
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
  }
  }

  async findAll(token : string,authContext?: any,detokenize?: string,detokenizeData?: any
) {
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }
    try{
      const whereClause: any = { trs_tenant_id: authContext.tenant };
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findMany({ 
      where: whereClause,
      // Hard cap — this endpoint has no page/limit params to opt into
      // pagination, so it previously returned the entire table unbounded.
      take: MAX_PAGE_SIZE,
      orderBy:{...detokenizeData?.sortingcolumns||{}},
      select: {vgphtsid:true,prcts_uuid:true,data_json:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,      }
      }));
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'vgph_temp_staging');
        decryptedRes.push(decryptedData);
      }
      if (this.tokenizationRules?.rules?.fields?.length > 0 && detokenize == 'true') {
        for (let data = 0; data < decryptedRes.length; data++) {
          if(decryptedRes[data]?.trs_token_id){
            let deTokenizedData =  await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${decryptedRes[data]['trs_token_id']}`,
            )
            deTokenizedData = deTokenizedData.data;
            decryptedRes[data] = { ...decryptedRes[data], ...deTokenizedData} ;            
          }
        }
      }
      if (this.tokenizationRules?.rules?.fields?.length > 0 && Object.keys(detokenizeData).length > 0) {
      for (let data = 0; data < decryptedRes.length; data++) {
        if(decryptedRes[data]?.trs_token_id){
          let getMaskedData: any = await axios.get(
            `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${decryptedRes[data]['trs_token_id']}`,
          )
          const maskedData = getMaskedData?.data;
          if (maskedData && typeof maskedData === 'object') {
            for (const key of Object.keys(maskedData)) {
              if (key in detokenizeData) {
                const maskValue = maskedData[key];
                if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
                  decryptedRes[data][key] = maskValue[detokenizeData[key]];
                }
              }
            }
          }
        }
      }
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
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
    }
    }
    
  async create(createvgph_temp_stagingDto: Createvgph_temp_stagingDto,token:string,detokenize:string,detokenizeData?: any,authContext?: any) {
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }
    try{
      (createvgph_temp_stagingDto as any).trs_tenant_id = authContext.tenant;

      const dataSchema:any =  v.object({
            prcts_uuid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            data_json :v.any()  , 
            trs_created_date :v.optional((v.union([v.pipe(v.string(), v.isoDate()), v.pipe(v.string(), v.isoTimestamp())])))  , 
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
            trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
      });
      let validate : any = v.safeParse(dataSchema,createvgph_temp_stagingDto);
      if (!validate.success) {
        let errorObj: errorObj = {
          tname: 'TG',
          errGrp: 'Data',
          fabric: 'DF',
          errType: 'Fatal',
          errCode: 'TG101',
        };
        const allErrors: any[] = [];
        for (const issue of validate.issues) {
          const columnName = issue.path?.[0]?.key ?? 'unknown';
          const errorMessage = issue.message;
          allErrors.push({
            columnName,
            message: errorMessage,
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            `${columnName}: ${errorMessage}`,
            "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createvgph_temp_stagingDto, 'vgph_temp_staging', 'create'), token);
      if (this.tokenizationRules?.rules?.fields?.length > 0) {
        let tokenizedData = { ...this.tokenizationRules, payload: encryptedData };
        tokenizedData =     await axios.post(
            `${process.env.TOKENIZATION_BASE_URL}/dynamic-tokenization`,
            tokenizedData,
            { headers: { 
              'Content-Type': 'application/json',
              app_code : process.env.APPCODE,
              product_code : `${process.env.APPCODE}_${process.env.APPGROUPNAME}`,
              tnt_id : process.env.TENANT
            },         
            }
          );
        encryptedData = tokenizedData?.data
        if ('tokenId' in encryptedData) {
          encryptedData.trs_token_id = encryptedData.tokenId;
          delete encryptedData.tokenId;
        }
      }
      let res:any = await this.prismaService.withConnection(() =>
        this.prismaService.vgph_temp_staging.create({
          data: encryptedData,
          select:{vgphtsid:true,prcts_uuid:true,data_json:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,}          
        })
      );
      if (detokenize ==="true" && this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id) {
        let deTokenizedData =  await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${res['trs_token_id']}`,
            )
            res = { ...res, ...deTokenizedData?.data} ;            
      }
      
      if (this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id && Object.keys(detokenizeData).length > 0) {
      let getMaskedData: any = await axios.get(
          `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${res['trs_token_id']}`,
        )
      const maskedData = getMaskedData?.data;
      if (maskedData && typeof maskedData === 'object') {
        for (const key of Object.keys(maskedData)) {
          if (key in detokenizeData) {
            const maskValue = maskedData[key];
            if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
              res[key] = maskValue[detokenizeData[key]];
            }
          }
        }
      }
    }
    return await this.decryptData(await this.commonDecimalDatahandle(res), 'vgph_temp_staging');
  } catch (error:any) {
    if (error instanceof CustomException) {
      throw error;
    }
    const errMsg = parsePrismaCreateError(error);
    const errorMessage = 'Create Error';
    await this.commonService.errorLog(
      "Technical",
      'AK',
      'Fatal',
      "TG022",
      errMsg.message,
      "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
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
   // Q15 closure attempt (pilot, creditors only) — ⚠ UNVERIFIED AGAINST YOUR
  // REAL SCHEMA, READ THIS BEFORE TRUSTING IT ⚠
  //
  // The gap: createMaster's AUTHORIZER branch approves/rejects a pending
  // INSERT by approval_id alone, with nothing checking that the pending
  // change was staged under the caller's own tenant. That staged change
  // lives in the `tam` schema's maker-checker staging table — which has
  // NO Prisma model, NO migration, and NO schema definition anywhere in
  // this repository. It is not visible to this codebase.
  //
  // The three constants below are a best-effort GUESS, not a confirmed
  // fact. The only real tam.* table name visible anywhere in this repo is
  // `tam.tam_transaction_locks` (used by uf.service.ts's lock/unlock), so
  // TAM_STAGING_TABLE follows that same `tam_<noun>` naming convention —
  // that is the entire basis for the guess. TAM_APPROVAL_ID_COLUMN and
  // TAM_CHANGES_COLUMN are guessed from the parameter names
  // tam.request_change() itself uses (p_changes, and the approval_id it
  // returns). None of this has been run against a real database — there
  // is no reachable Postgres instance or schema file in this environment
  // to verify it against.
  //
  // Deliberately fails CLOSED, not open: if the lookup errors (near-certain
  // on first deploy until someone confirms/corrects these three constants
  // against the real tam schema) or the caller has no tenant claim or the
  // staged tenant doesn't match, this throws and blocks the approve/reject
  // — it does not fall through and silently allow the action. That means
  // this WILL break creditors' approve/reject flow in your environment
  // until the constants below are corrected. That is intentional: a
  // security check that fails open when misconfigured is worse than no
  // check at all, and this cannot be validated from inside this repo.
  //
  // To finish this: confirm the real table/column names (e.g. `\dt tam.*`
  // and `\d tam.<table>` in psql, or ask whoever owns that schema) and
  // update the three constants — no other code changes needed.
  private readonly TAM_STAGING_TABLE = 'tam_change_requests'; // ⚠ UNCONFIRMED GUESS
  private readonly TAM_APPROVAL_ID_COLUMN = 'approval_id'; // ⚠ UNCONFIRMED GUESS
  private readonly TAM_CHANGES_COLUMN = 'changes'; // ⚠ UNCONFIRMED GUESS — expected JSONB containing trs_tenant_id

  private async verifyPendingChangeTenant(approvalId: number, callerTenant: string | undefined, token: string): Promise<void> {
    if (!callerTenant) {
      throw new ForbiddenException('Cannot verify tenant ownership of this approval without a verified tenant claim');
    }
    let rows: any[];
    try {
      // The three identifiers are spliced as plain JS string interpolation
      // (not a Prisma tagged template) because you can't bind-parameterize
      // a table/column name — safe here only because they are hardcoded
      // class constants above, never derived from request input.
      // approvalId is passed separately as a real bound parameter ($1),
      // via $queryRawUnsafe(sql, ...values) — standard Prisma Client API.
      const sql = `SELECT ${this.TAM_CHANGES_COLUMN}->>'trs_tenant_id' AS staged_tenant
                   FROM tam.${this.TAM_STAGING_TABLE}
                   WHERE ${this.TAM_APPROVAL_ID_COLUMN} = $1`;
      rows = await this.cdcPrismaService.withConnection(() =>
        (this.cdcPrismaService as any).$queryRawUnsafe(sql, approvalId),
      );
    } catch (lookupError: any) {
      await this.commonService.errorLog(
        'Technical', 'AK', 'Fatal', 'TG032',
        `staged-tenant lookup failed for approval_id=${approvalId} — TAM_STAGING_TABLE/TAM_APPROVAL_ID_COLUMN/TAM_CHANGES_COLUMN in ${this.constructor.name} do not match the real tam schema and need correcting. Underlying error: ${lookupError?.message ?? lookupError}`,
        'CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1',
        token,
      );
      throw new HttpException(
        'Unable to verify tenant ownership of this approval',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const stagedTenant = rows?.[0]?.staged_tenant;
    if (!stagedTenant || stagedTenant !== callerTenant) {
      throw new ForbiddenException('This approval was staged under a different tenant');
    }
  }


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
    createvgph_temp_stagingDto: Createvgph_temp_stagingDto,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string, approvalId?: string },
    token: string,
    authContext?: any,
  ) {
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }
    try {
      (createvgph_temp_stagingDto as any).trs_tenant_id = authContext.tenant;
      const workflowRole = userInfo.role?.toUpperCase();
      const approvalStatus = userInfo.approvalStatus?.toUpperCase();

      // =====================================================
      // CHECKER ROLE: Approve pending INSERT request
      // =====================================================
      if (workflowRole === 'AUTHORIZER') {
        // R2 remediation: xCdcaRole is a client-declared workflow request,
        // not a credential — verify the caller's own verified identity is
        // actually entitled to authorize changes for this module before
        // honoring it.
         //
        // Q15 remediation (pilot): getAccessTemplate previously resolved
        // "is this caller entitled to creditors:AUTHORIZE at all" against
        // the deployment-global process.env.TENANT, not the caller's own
        // verified tenant claim — so entitlement itself wasn't tenant-scoped.
        // Passing authContext.tenant here narrows that: the caller must
        // hold the AUTHORIZE capability within their *own* tenant's
        // access-profile assignment, not merely within the deployment at
        // large.
        //
        // IMPORTANT — entitlement alone still isn't tenant-specific to the
        // *target* approval_id. verifyPendingChangeTenant() below is a
        // best-effort attempt to close that: see its own comment block for
        // why it's UNVERIFIED against the real tam schema, and why it fails
        // closed rather than silently allowing the action if it can't
        // confirm the match.
        if (!(await this.ufservice.hasCapability(token, 'vgph_temp_staging:AUTHORIZE', authContext?.tenant))) {
          throw new ForbiddenException('Caller is not entitled to authorize changes for vgph_temp_staging');
        }
        const approvalId = userInfo.approvalId;

        if (!approvalId) {
          throw new HttpException('approval_id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }
        // Q15 closure attempt — see verifyPendingChangeTenant()'s own
        // comment block above for the full caveat about these guessed
        // table/column names being unverified against the real database.
        await this.verifyPendingChangeTenant(+approvalId, authContext?.tenant, token);
        if (approvalStatus === 'APPROVED') {
          // Call approve_change(approval_id, checker_id, checker_remarks)
          
          const result = await this.cdcPrismaService.withConnection(() =>
          this.cdcPrismaService.$queryRaw<any[]>`
            SELECT tam.approve_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `);
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'vgph_temp_staging creation approved and applied successfully',
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
          const result = await this.cdcPrismaService.withConnection(() =>
          this.cdcPrismaService.$queryRaw<any[]>`
            SELECT tam.reject_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `);
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'vgph_temp_staging creation rejected',
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
            prcts_uuid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            data_json :v.any()  , 
            trs_created_date :v.optional((v.pipe(v.string(),v.isoDate())))  , 
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
            trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
      });
      let validate : any = v.safeParse(dataSchema,createvgph_temp_stagingDto);
      if (!validate.success) {
        let errorObj: errorObj = {
          tname: 'TG',
          errGrp: 'Data',
          fabric: 'DF',
          errType: 'Fatal',
          errCode: 'TG101',
        };
        const allErrors: any[] = [];
        for (const issue of validate.issues) {
          const columnName = issue.path?.[0]?.key ?? 'unknown';
          const errorMessage = issue.message;
          allErrors.push({
            columnName,
            message: errorMessage,
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            `${columnName}: ${errorMessage}`,
            "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      
      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createvgph_temp_stagingDto, 'vgph_temp_staging', 'create'), token);
      encryptedData['trs_modified_date'] = new Date();
      if (this.tokenizationRules?.rules?.fields?.length > 0) {
        let tokenizedData = { ...this.tokenizationRules, payload: encryptedData };
        tokenizedData =     await axios.post(
            `${process.env.TOKENIZATION_BASE_URL}/dynamic-tokenization`,
            tokenizedData,
            { headers: { 
              'Content-Type': 'application/json',
              app_code : process.env.APPCODE,
              product_code : `${process.env.APPCODE}_${process.env.APPGROUPNAME}`,
              tnt_id : process.env.TENANT
            },         
            }
          );
        encryptedData = tokenizedData?.data
        if ('tokenId' in encryptedData) {
          encryptedData.trs_token_id = encryptedData.tokenId;
          delete encryptedData.tokenId;
        }
      }


      // Convert numeric values to strings for JSONB (as per the documentation pattern)
      //const changes: Record<string, string> = {};
      //for (const [key, value] of Object.entries(encryptedData)) {
      //  if (value !== null && value !== undefined && key !== 'approval_id') {
      //    changes[key] = String(value);
      //  }
      //}
      if(workflowRole === 'SUBMITTER')
      {
        
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT tam.request_change(
            p_table_name     := 'vgph_temp_staging',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'vgphtsid',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct005_vgph'
          ) AS approval_id
        `);

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'vgph_temp_staging creation request submitted for approval',
          approval_id: approvalId,
          status: 'CREATED'
        };
      }
      // Call request_change() for INSERT
      // For INSERT: p_record_id is NULL, p_changes contains the new data

    } catch (error: any) {
      if (error instanceof CustomException) {
        throw error;
      }
      const errorMessage = 'Error in createMaster';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG031",
        error,
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
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
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

  async update(vgphtsid:number, updatevgph_temp_stagingDto: Updatevgph_temp_stagingDto,token:string, detokenize:string,detokenizeData?: any,authContext?: any) {   
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }
    try{
      const owned = await this.prismaService.withConnection(() =>
        this.prismaService.vgph_temp_staging.findFirst({
          where: {vgphtsid, trs_tenant_id: authContext.tenant },
          select: {vgphtsid:true, },
        }),
      );
      if (!owned) {
        throw new CustomException('Record not found', HttpStatus.NOT_FOUND);
      }

      const dataSchema:any =  v.object({
          prcts_uuid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          data_json :  v.optional(v.any()), 
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
          trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
      });
      let validate : any = v.safeParse(dataSchema,updatevgph_temp_stagingDto);
      if (!validate.success) {
        let errorObj: errorObj = {
          tname: 'TG',
          errGrp: 'Data',
          fabric: 'DF',
          errType: 'Fatal',
          errCode: 'TG101',
        };
        const allErrors: any[] = [];
        for (const issue of validate.issues) {
          const columnName = issue.path?.[0]?.key ?? 'unknown';
          const errorMessage = issue.message;
          allErrors.push({
            columnName,
            message: errorMessage,
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            `${columnName}: ${errorMessage}`,
            "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatevgph_temp_stagingDto,'vgph_temp_staging','update'), token);
      if (this.tokenizationRules?.rules?.fields?.length > 0) {
        let tokenizedData = { ...this.tokenizationRules, payload: encryptedData };
        tokenizedData =     await axios.post(
        `${process.env.TOKENIZATION_BASE_URL}/dynamic-tokenization`,
          tokenizedData,
          { headers: { 
            'Content-Type': 'application/json',
            app_code : process.env.APPCODE,
            product_code : `${process.env.APPCODE}_${process.env.APPGROUPNAME}`,
            tnt_id : process.env.TENANT
          },         
          }
        );
        encryptedData = tokenizedData?.data
        if ('tokenId' in encryptedData) {
          encryptedData.trs_token_id = encryptedData.tokenId;
          delete encryptedData.tokenId;
        }        
      }
    
    const currentVersion = (updatevgph_temp_stagingDto as any)?.trs_version;
    if (currentVersion === undefined || currentVersion === null || currentVersion === '') {
      await this.prismaService.withConnection(() =>
        this.prismaService.vgph_temp_staging.updateMany({
        where: {vgphtsid},
        data: encryptedData
      }));
    }else{
      // Single atomic UPDATE guarded by id + trs_version; throws ConflictException (409)
      // when no row matches, i.e. another user already changed the record.
      // trs_version itself is stripped from the write — the DB trigger owns it.
      await this.prismaService.withConnection(() =>
        this.optimisticLockService.updateWithVersionCheck(this.prismaService, 'vgph_temp_staging', {
          primaryKey: {vgphtsid},
          currentVersion,
          data: encryptedData,
        }),
      );
    }

    const updated = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findMany({
      where: {vgphtsid},
      select: {vgphtsid:true,prcts_uuid:true,data_json:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,}
    }));
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'vgph_temp_staging');
    let decryptedRes: any = [];
    for (const indiviual of updated) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'vgph_temp_staging');
      decryptedRes.push(decryptedData);
    }
    if (this.tokenizationRules?.rules?.fields?.length > 0 && detokenize == 'true') {
        for (let data = 0; data < decryptedRes.length; data++) {
          if(decryptedRes[data]?.trs_token_id){
          let deTokenizedData =  await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${decryptedRes[data]['trs_token_id']}`,
            )
            deTokenizedData = deTokenizedData.data;
            decryptedRes[data] = { ...decryptedRes[data], ...deTokenizedData} ;   
          }          
        }
    }
    if (this.tokenizationRules?.rules?.fields?.length > 0 && decryptedRes[0]?.trs_token_id && Object.keys(detokenizeData).length > 0) {
      let getMaskedData: any = await axios.get(
          `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${decryptedRes[0]['trs_token_id']}`,
        )
      const maskedData = getMaskedData?.data;
      if (maskedData && typeof maskedData === 'object') {
        for (const key of Object.keys(maskedData)) {
          if (key in detokenizeData) {
            const maskValue = maskedData[key];
            if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
              decryptedRes[0][key] = maskValue[detokenizeData[key]];
            }
          }
        }
      }
    }
    return decryptedRes;
    } catch (error:any) {
      if (error instanceof CustomException || error instanceof HttpException) {
        throw error;
      }
      const errorMessage = 'update Error';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG023",
        error,
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
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
vgphtsid:number,
    updatevgph_temp_stagingDto: Updatevgph_temp_stagingDto,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string,
    authContext?: any,
  ) {
    try {
      // Fail closed when the JWT has no tenant claim — without a verified
      // tenant we cannot prove ownership of the record being changed.
      if (!authContext?.tenant) {
        throw new ForbiddenException('Tenant claim is missing from the token');
      }
      const workflowRole = userInfo.role?.toUpperCase();
      const updateMaster_id =vgphtsid;

      // =====================================================
      // CHECKER ROLE: Approve pending UPDATE request
      // =====================================================
      if (workflowRole === 'AUTHORIZER') {

        if (!updateMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // R2 remediation: xCdcaRole is a client-declared workflow request,
        // not a credential — verify entitlement against the caller's own
        // verified identity before honoring it.
        if (!(await this.ufservice.hasCapability(token, 'vgph_temp_staging:AUTHORIZE', authContext?.tenant))) {
          throw new ForbiddenException('Caller is not entitled to authorize changes for vgph_temp_staging');
        }

        // Close the tenant-blindness half of R2: the pending change's
        // target row still exists in its pre-change state until approved,
        // so its current tenant is checkable here even though the pending
        // change payload itself isn't.
        const targetRecord = await this.prismaService.vgph_temp_staging.findFirst({
          where: {vgphtsid },
          select: { trs_tenant_id: true },
        });
        if (targetRecord && targetRecord.trs_tenant_id !== authContext.tenant) {
          throw new ForbiddenException('Record belongs to a different tenant');
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        // const result = await this.cdcPrismaService.withConnection(() =>
        //this.cdcPrismaService.$queryRaw<any[]>`
        //   SELECT * FROM approve_change_by_record(
        //     'customers',
        //     ${approvalId},
        //     ${userInfo.username},
        //     ${userInfo.remarks || null}
        //   ) AS success
        // `);
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT * FROM tam.approve_change_by_record(
              p_table_name      := 'vgph_temp_staging',
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
            message: 'vgph_temp_staging update approved and applied successfully',
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
          const result = await this.cdcPrismaService.withConnection(() =>
          this.cdcPrismaService.$queryRaw<any[]>`
            SELECT * FROM tam.reject_change_by_record(
                p_table_name      := 'vgph_temp_staging',
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
              message: 'vgph_temp_staging update rejected',
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
          prcts_uuid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          data_json :  v.optional(v.any()), 
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
          trs_token_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          trs_version :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
      });
      let validate : any = v.safeParse(dataSchema,updatevgph_temp_stagingDto);
      if (!validate.success) {
        const allErrors: any[] = [];
        for (const issue of validate.issues) {
          const columnName = issue.path?.[0]?.key ?? 'unknown';
          const errorMessage = issue.message;
          allErrors.push({
            columnName,
            message: errorMessage,
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          });
          await this.commonService.errorLog(
            "Technical",
            'AK',
            'Fatal',
            "TG021",
            `${columnName}: ${errorMessage}`,
            "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }

      // Verify record exists
      const existingRecord = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findMany({
        where: {vgphtsid}
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatevgph_temp_stagingDto, 'vgph_temp_staging', 'update'), token);
      if (this.tokenizationRules?.rules?.fields?.length > 0) {
        let tokenizedData = { ...this.tokenizationRules, payload: encryptedData };
        tokenizedData =     await axios.post(
        `${process.env.TOKENIZATION_BASE_URL}/dynamic-tokenization`,
          tokenizedData,
          { headers: { 
            'Content-Type': 'application/json',
            app_code : process.env.APPCODE,
            product_code : `${process.env.APPCODE}_${process.env.APPGROUPNAME}`,
            tnt_id : process.env.TENANT
          },         
          }
        );
        encryptedData = tokenizedData?.data
        if ('tokenId' in encryptedData) {
          encryptedData.trs_token_id = encryptedData.tokenId;
          delete encryptedData.tokenId;
        }        
      }      

      // Call request_change() for UPDATE
      // For UPDATE: p_record_id is the ID, p_changes contains only changed fields
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT tam.request_change(
          p_table_name     := 'vgph_temp_staging',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'vgphtsid',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct005_vgph'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'vgph_temp_staging update request submitted for approval',
        approval_id: approvalId,
        record_id: updateMaster_id,
        status: 'CREATED'
      };
    } catch (error: any) {
      if (error instanceof CustomException) {
        throw error;
      }
      const errorMessage = 'Error in updateMaster';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG033",
        error,
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
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
      throw new CustomException(errorMessage, toHttpStatus(error));                                                                              
    }
  }

  async remove(vgphtsid:number,token : string, detokenize: string,detokenizeData?: any,authContext?: any) {
    try{
    // Fail closed when the JWT has no tenant claim — without a verified
    // tenant we cannot scope the deletion to the caller's own rows.
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }
    const tenantFilter = { trs_tenant_id: authContext.tenant };

    const toDelete = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findMany({
      where: {vgphtsid ,...tenantFilter},
      select: {vgphtsid:true,prcts_uuid:true,data_json:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,}
    })); 
    await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.deleteMany({
      where: {vgphtsid ,...tenantFilter}
    })); 
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'vgph_temp_staging');
    let decryptedRes: any = [];
    for (const indiviual of toDelete) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'vgph_temp_staging');
      decryptedRes.push(decryptedData);
    }
    if (this.tokenizationRules?.rules?.fields?.length > 0 && detokenize == 'true') {
        for (let data = 0; data < decryptedRes.length; data++) {
          if(decryptedRes[data]?.trs_token_id){
          let deTokenizedData =  await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${decryptedRes[data]['trs_token_id']}`,
            )
            deTokenizedData = deTokenizedData.data;
            decryptedRes[data] = { ...decryptedRes[data], ...deTokenizedData} ;   
          }          
        }
    }
    if (this.tokenizationRules?.rules?.fields?.length > 0 && decryptedRes[0]?.trs_token_id && Object.keys(detokenizeData).length > 0) {
      let getMaskedData: any = await axios.get(
          `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${decryptedRes[0]['trs_token_id']}`,
        )
      const maskedData = getMaskedData?.data;
      if (maskedData && typeof maskedData === 'object') {
        for (const key of Object.keys(maskedData)) {
          if (key in detokenizeData) {
            const maskValue = maskedData[key];
            if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
              decryptedRes[0][key] = maskValue[detokenizeData[key]];
            }
          }
        }
      }
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
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
vgphtsid:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string,
    authContext?: any,
  ) {
    try {
      // Fail closed when the JWT has no tenant claim — without a verified
      // tenant we cannot prove ownership of the record being changed.
      if (!authContext?.tenant) {
        throw new ForbiddenException('Tenant claim is missing from the token');
      }
      const workflowRole = userInfo.role?.toUpperCase();
      const deleteMaster_id =vgphtsid;

      // =====================================================
      // CHECKER ROLE: Approve pending DELETE request
      // =====================================================
      if (workflowRole === 'AUTHORIZER') {

        if (!deleteMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // R2 remediation: xCdcaRole is a client-declared workflow request,
        // not a credential — verify entitlement against the caller's own
        // verified identity before honoring it.
        if (!(await this.ufservice.hasCapability(token, 'vgph_temp_staging:AUTHORIZE', authContext?.tenant))) {
          throw new ForbiddenException('Caller is not entitled to authorize changes for vgph_temp_staging');
        }

        // Close the tenant-blindness half of R2: the pending change's
        // target row still exists in its pre-change state until approved,
        // so its current tenant is checkable here.
        const targetRecord = await this.prismaService.vgph_temp_staging.findFirst({
          where: {vgphtsid },
          select: { trs_tenant_id: true },
        });
        if (targetRecord && targetRecord.trs_tenant_id !== authContext.tenant) {
          throw new ForbiddenException('Record belongs to a different tenant');
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT * FROM tam.approve_change_by_record(
              p_table_name      := 'vgph_temp_staging',
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
            message: 'vgph_temp_staging deletion approved and applied successfully',
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
          const result = await this.cdcPrismaService.withConnection(() =>
          this.cdcPrismaService.$queryRaw<any[]>`
            SELECT * FROM tam.reject_change_by_record(
                p_table_name      := 'vgph_temp_staging',
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
              message: 'vgph_temp_staging deletion rejected',
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
      this.prismaService.vgph_temp_staging.findMany({
        where: {vgphtsid  }
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT tam.request_change(
          p_table_name     := 'vgph_temp_staging',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'vgphtsid',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct005_vgph'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'vgph_temp_staging deletion request submitted for approval',
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
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
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }
  async findFirst(token : string, detokenize: string, detokenizeData?: any, authContext?: any) {
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }

    try{
      let res = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findFirst({ 
        where: { trs_tenant_id: authContext.tenant },
        orderBy: { trs_created_date: 'asc' },
      }));
      if (this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id && detokenize == 'true') {
          let deTokenizedData =  await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${res['trs_token_id']}`,
            )
          res = { ...res, ...deTokenizedData?.data} ;
      }
      if (this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id && Object.keys(detokenizeData).length > 0) {
        let getMaskedData: any = await axios.get(
            `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${res['trs_token_id']}`,
          )
        const maskedData = getMaskedData?.data;
        if (maskedData && typeof maskedData === 'object') {
          for (const key of Object.keys(maskedData)) {
            if (key in detokenizeData) {
              const maskValue = maskedData[key];
              if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
                res[key] = maskValue[detokenizeData[key]];
              }
            }
          }
        }
      }         
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'vgph_temp_staging');
    } catch (error:any) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
      }
  }
  async findLast(token : string, detokenize: string ,detokenizeData?: any, authContext?: any) {
    if (!authContext?.tenant) {
      throw new ForbiddenException('Tenant claim is missing from the token');
    }

    try{
      let res = await this.prismaService.withConnection(() =>
      this.prismaService.vgph_temp_staging.findFirst({ 
        where: { trs_tenant_id: authContext.tenant },
        orderBy: { trs_created_date: 'desc' },
      }));
      if (this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id && detokenize == 'true') {
          let deTokenizedData =  await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${res['trs_token_id']}`,
            )
          res = { ...res, ...deTokenizedData?.data} ;
      }    
      if (this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id && Object.keys(detokenizeData).length > 0) {
        let getMaskedData: any = await axios.get(
            `${process.env.TOKENIZATION_BASE_URL}/get-masked-tokenized-data/${res['trs_token_id']}`,
          )
        const maskedData = getMaskedData?.data;
        if (maskedData && typeof maskedData === 'object') {
          for (const key of Object.keys(maskedData)) {
            if (key in detokenizeData) {
              const maskValue = maskedData[key];
              if (maskValue && typeof maskValue === 'object' && detokenizeData[key] in maskValue) {
                res[key] = maskValue[detokenizeData[key]];
              }
            }
          }
        }
      }     
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'vgph_temp_staging');
    } catch (error:any) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
      }
  }

  async getLockById(key: string, value: any, token: string) {
    try {
      const decodedToken: any = this.jwtServices.verifyToken(token);
      const loginId = decodedToken.loginId;

      // Allow-list `key` against real vgph_temp_staging columns (via Prisma DMMF) —
      // previously this was concatenated straight into the lock's raw SQL,
      // letting any authenticated caller inject SQL through this field.
      const allowedKeys = Object.keys(getModelFieldTypes('vgph_temp_staging'));
      if (typeof key !== 'string' || !allowedKeys.includes(key)) {
        throw new BadRequestException(`Invalid lock key: ${key}`);
      }

      const locked = await this.ufservice.acquireLock({
        tableName: 'vgph_temp_staging',
        key: key,
        value: value,
        userId: loginId,
      } as LockRecordDto);

      if (!locked.success) {
        throw new HttpException('Failed to acquire lock', HttpStatus.CONFLICT);
      }

      const res = await this.prismaService.withConnection(() =>
        this.prismaService.vgph_temp_staging.findMany({
          where: { 
            [key]: value
          },
        }));

      const decryptedRes: any = [];
      for (const record of res) {
        const plain = await this.commonDecimalDatahandle(record);
        decryptedRes.push(await this.decryptData(plain, 'vgph_temp_staging'));
      }
      return decryptedRes;
    } catch (error: any) {
      if (error instanceof HttpException || error instanceof ConflictException) {
        throw error;
      }
      const errorMessage = 'Error in getLockById';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG041",
        error,
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

  async releaseLockById(key: string, value: any, token: string) {
    try {
      const decodedToken: any = this.jwtServices.verifyToken(token);
      const loginId = decodedToken.loginId;

      // Allow-list `key` against real vgph_temp_staging columns (via Prisma DMMF) —
      // previously this was concatenated straight into the unlock's raw SQL,
      // letting any authenticated caller inject SQL through this field.
      const allowedKeys = Object.keys(getModelFieldTypes('vgph_temp_staging'));
      if (typeof key !== 'string' || !allowedKeys.includes(key)) {
        throw new BadRequestException(`Invalid lock key: ${key}`);
      }

      await this.ufservice.releaseLock({
        tableName: 'vgph_temp_staging',
        key: key,
        value: value,
        userId: loginId,
      } as LockRecordDto);

      return {
        success: true,
        message: 'Record unlocked successfully',
      };
    } catch (error: any) {
      if (error instanceof HttpException || error instanceof ConflictException) {
        throw error;
      }
      const errorMessage = 'Error in releaseLockById';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG042",
        error,
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:NPSS_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

}
