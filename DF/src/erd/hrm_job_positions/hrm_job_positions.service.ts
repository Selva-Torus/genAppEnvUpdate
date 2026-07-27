import { HttpException, Injectable,HttpStatus,InternalServerErrorException,ConflictException,BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CdcPrismaService } from '../cdc_prisma.service'; 
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { hrm_job_positionsEntity } from './entity/hrm_job_positions.entity';
import { CustomException } from 'src/customException';
import { JwtServices } from 'src/jwt.services';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { LockRecordDto } from 'src/dto';
import axios from 'axios';
import { OptimisticLockService } from 'src/optimistic-lock.service';
@Injectable()
export class hrm_job_positionsService {
  constructor(private readonly prismaService: PrismaService,
  private readonly cdcPrismaService: CdcPrismaService,
  private readonly commonService: CommonService,
  private readonly jwtServices: JwtServices,
  private readonly ufservice: UfService,
  private readonly optimisticLockService: OptimisticLockService) {}
  private encryptedCols: any={
  "hrm_employees": [
    {
      "column": "hrm_employee_access_requests",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "hrm_employee_background_checks",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "hrm_employee_nda",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "hrm_separation_checklists",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "hrm_performance_reviews",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "hrm_leave_requests",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "hrm_job_positions": [
    {
      "column": "hrm_employees",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "hrm_job_grades": [
    {
      "column": "hrm_employees",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "hrm_job_positions",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "hrm_leave_policies": [
    {
      "column": "hrm_leave_requests",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "hrm_leave_requests": [],
  "hrm_performance_cycles": [
    {
      "column": "hrm_performance_reviews",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "hrm_performance_reviews": [],
  "hrm_separation_checklists": [],
  "hrm_employee_access_requests": [],
  "hrm_employee_background_checks": [],
  "hrm_employee_nda": []
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
       salary_range_min:data?.salary_range_min != null ? Number(data?.salary_range_min?.toString()) : null,
       salary_range_max:data?.salary_range_max != null ? Number(data?.salary_range_max?.toString()) : null,
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
            position_id:"bigint",
            position_code:"string",
            position_title:"string",
            description:"string",
            employment_type:"string",
            experience_required:"number",
            salary_range_min:"decimal",
            salary_range_max:"decimal",
            headcount:"number",
            approved_headcount:"number",
            filled_headcount:"number",
            is_open:"boolean",
            vacancy_status:"string",
            remote_allowed:"boolean",
            travel_required:"boolean",
            job_family:"string",
            job_level:"string",
            additional_details:"json",
            secure_data:"json",
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
      grade_id :"number",    }
    return data;
  }

 async findAllmethod(queryDto: any, limit:number, selectColumns:any, token:any) {
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
      const { position_id }: {position_id : bigint} = queryValue;
      const { position_code }: {position_code : string} = queryValue;
      const { position_title }: {position_title : string} = queryValue;
      const { description }: {description : string} = queryValue;
      const { employment_type }: {employment_type : string} = queryValue;
      const { experience_required }: {experience_required : number} = queryValue;
      const { salary_range_min }: {salary_range_min : Date} = queryValue;
      const { salary_range_max }: {salary_range_max : Date} = queryValue;
      const { headcount }: {headcount : number} = queryValue;
      const { approved_headcount }: {approved_headcount : number} = queryValue;
      const { filled_headcount }: {filled_headcount : number} = queryValue;
      const { is_open }: {is_open : Date} = queryValue;
      const { vacancy_status }: {vacancy_status : string} = queryValue;
      const { remote_allowed }: {remote_allowed : Date} = queryValue;
      const { travel_required }: {travel_required : Date} = queryValue;
      const { job_family }: {job_family : string} = queryValue;
      const { job_level }: {job_level : string} = queryValue;
      const { additional_details }: {additional_details : any } = queryValue;
      const { secure_data }: {secure_data : any } = queryValue;
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

      if(position_id){ 
        query.position_id = { [queryCondition['position_id']]: position_id };
      }
      if(position_code){ 
        query.position_code = { [queryCondition['position_code']]: position_code };
      }
      if(position_title){ 
        query.position_title = { [queryCondition['position_title']]: position_title };
      }
      if(description){ 
        query.description = { [queryCondition['description']]: description };
      }
      if(employment_type){ 
        query.employment_type = { [queryCondition['employment_type']]: employment_type };
      }
      if(experience_required){ 
        query.experience_required = { [queryCondition['experience_required']]: experience_required };
      }
      if(salary_range_min){ 
        query.salary_range_min = { [queryCondition['salary_range_min']]: salary_range_min };
      }
      if(salary_range_max){ 
        query.salary_range_max = { [queryCondition['salary_range_max']]: salary_range_max };
      }
      if(headcount){ 
        query.headcount = { [queryCondition['headcount']]: headcount };
      }
      if(approved_headcount){ 
        query.approved_headcount = { [queryCondition['approved_headcount']]: approved_headcount };
      }
      if(filled_headcount){ 
        query.filled_headcount = { [queryCondition['filled_headcount']]: filled_headcount };
      }
      if(is_open){ 
        query.is_open = { [queryCondition['is_open']]: is_open };
      }
      if(vacancy_status){ 
        query.vacancy_status = { [queryCondition['vacancy_status']]: vacancy_status };
      }
      if(remote_allowed){ 
        query.remote_allowed = { [queryCondition['remote_allowed']]: remote_allowed };
      }
      if(travel_required){ 
        query.travel_required = { [queryCondition['travel_required']]: travel_required };
      }
      if(job_family){ 
        query.job_family = { [queryCondition['job_family']]: job_family };
      }
      if(job_level){ 
        query.job_level = { [queryCondition['job_level']]: job_level };
      }
      if(additional_details){ 
        query.additional_details = { [queryCondition['additional_details']]: additional_details };
      }
      if(secure_data){ 
        query.secure_data = { [queryCondition['secure_data']]: secure_data };
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
        this.prismaService.hrm_job_positions.findMany({
          select:columns,
          where: query,          
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'hrm_job_positions');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.hrm_job_positions.findMany({
          select:columns,
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'hrm_job_positions');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findMany({
        select:columns,
        where: query,
        skip: skip,
        take: limit,
      }));

      const totalItems = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.count({
        where: query,
      }));

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'hrm_job_positions');
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

  async findOne(position_id:number,token : string,detokenize?: string,detokenizeData?: any) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findMany({ 
      where: {position_id},
      select: {position_id:true,position_code:true,position_title:true,description:true,employment_type:true,experience_required:true,salary_range_min:true,salary_range_max:true,headcount:true,approved_headcount:true,filled_headcount:true,is_open:true,vacancy_status:true,remote_allowed:true,travel_required:true,job_family:true,job_level:true,additional_details:true,secure_data:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,            hrm_employees:{
              select:{
              employee_id:true,              employee_code:true,              emp_number:true,              first_name:true,              middle_name:true,              last_name:true,              full_name:true,              preferred_name:true,              gender:true,              date_of_birth:true,              marital_status:true,              personal_email:true,              work_email:true,              mobile:true,              alternate_mobile:true,              address_line1:true,              address_line2:true,              city:true,              state:true,              country:true,              postal_code:true,              nationality:true,              national_id:true,              passport_number:true,              blood_group:true,              employment_type:true,              employee_status:true,              hire_date:true,              confirmation_date:true,              probation_end:true,              resignation_date:true,              termination_date:true,              exit_reason:true,              work_mode:true,              timezone:true,              reporting_manager_id:true,              hr_manager_id:true,              current_salary:true,              annual_ctc:true,              salary_currency:true,              bank_name:true,              bank_account:true,              bank_ifsc:true,              emergency_contact_name:true,              emergency_contact_phone:true,              emergency_contact_relation:true,              biometric_id:true,              profile_photo_url:true,              linkedin_profile:true,              skills_json:true,              education_history_json:true,              certifications_json:true,              family_details_json:true,              additional_details:true,              custom_attributes_json:true,              secure_data:true,              deleted_at:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
grade_id :true,        }
    }));
    //return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_job_positions');
    let decryptedRes: any = [];
    for (const indiviual of res) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'hrm_job_positions');
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }

  async findAll(token : string,detokenize?: string,detokenizeData?: any
) {
    try{
      const whereClause: any = {};
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findMany({ 
      where: whereClause,
      select: {position_id:true,position_code:true,position_title:true,description:true,employment_type:true,experience_required:true,salary_range_min:true,salary_range_max:true,headcount:true,approved_headcount:true,filled_headcount:true,is_open:true,vacancy_status:true,remote_allowed:true,travel_required:true,job_family:true,job_level:true,additional_details:true,secure_data:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,          hrm_employees:{
              select:{
              employee_id:true,              employee_code:true,              emp_number:true,              first_name:true,              middle_name:true,              last_name:true,              full_name:true,              preferred_name:true,              gender:true,              date_of_birth:true,              marital_status:true,              personal_email:true,              work_email:true,              mobile:true,              alternate_mobile:true,              address_line1:true,              address_line2:true,              city:true,              state:true,              country:true,              postal_code:true,              nationality:true,              national_id:true,              passport_number:true,              blood_group:true,              employment_type:true,              employee_status:true,              hire_date:true,              confirmation_date:true,              probation_end:true,              resignation_date:true,              termination_date:true,              exit_reason:true,              work_mode:true,              timezone:true,              reporting_manager_id:true,              hr_manager_id:true,              current_salary:true,              annual_ctc:true,              salary_currency:true,              bank_name:true,              bank_account:true,              bank_ifsc:true,              emergency_contact_name:true,              emergency_contact_phone:true,              emergency_contact_relation:true,              biometric_id:true,              profile_photo_url:true,              linkedin_profile:true,              skills_json:true,              education_history_json:true,              certifications_json:true,              family_details_json:true,              additional_details:true,              custom_attributes_json:true,              secure_data:true,              deleted_at:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          grade_id :true,    
      }
      }));
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'hrm_job_positions');
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
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }
    }
    
  async create(createhrm_job_positionsDto: Prisma.hrm_job_positionsCreateInput,token:string,detokenize:string,detokenizeData?: any) {
    try{

      const dataSchema:any =  v.object({
            position_code :v.pipe(v.string(),v.maxLength(216 )) , 
            position_title :v.string() , 
            description :  v.optional(v.string()), 
            employment_type :v.string() , 
            experience_required :  v.optional(v.number()), 
            salary_range_min :  v.optional(v.number()), 
            salary_range_max :  v.optional(v.number()), 
            headcount :v.number() , 
            approved_headcount :v.number() , 
            filled_headcount :v.number() , 
            is_open :v.boolean()  , 
            vacancy_status :v.string() , 
            remote_allowed :v.boolean()  , 
            travel_required :v.boolean()  , 
            job_family :  v.optional(v.string()), 
            job_level :  v.optional(v.string()), 
            additional_details :  v.optional(v.any() ), 
            secure_data :  v.optional(v.any() ), 
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
      let validate : any = v.safeParse(dataSchema,createhrm_job_positionsDto);
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
            "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
            token
          );
        }
        //throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createhrm_job_positionsDto, 'hrm_job_positions', 'create'), token);
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
        this.prismaService.hrm_job_positions.create({
          data: encryptedData,
          select:{position_id:true,position_code:true,position_title:true,description:true,employment_type:true,experience_required:true,salary_range_min:true,salary_range_max:true,headcount:true,approved_headcount:true,filled_headcount:true,is_open:true,vacancy_status:true,remote_allowed:true,travel_required:true,job_family:true,job_level:true,additional_details:true,secure_data:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,hrm_employees:true,grade_id :true,}          
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
    return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_job_positions');
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
      "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
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
    createhrm_job_positionsDto: Prisma.hrm_job_positionsCreateInput,
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
              message: 'hrm_job_positions creation approved and applied successfully',
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
              message: 'hrm_job_positions creation rejected',
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
            position_code :v.pipe(v.string(),v.maxLength(216 )) , 
            position_title :v.string() , 
            description :  v.optional(v.string()), 
            employment_type :v.string() , 
            experience_required :  v.optional(v.number()), 
            salary_range_min :  v.optional(v.number()), 
            salary_range_max :  v.optional(v.number()), 
            headcount :v.number() , 
            approved_headcount :v.number() , 
            filled_headcount :v.number() , 
            is_open :v.boolean()  , 
            vacancy_status :v.string() , 
            remote_allowed :v.boolean()  , 
            travel_required :v.boolean()  , 
            job_family :  v.optional(v.string()), 
            job_level :  v.optional(v.string()), 
            additional_details :  v.optional(v.any() ), 
            secure_data :  v.optional(v.any() ), 
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
      let validate : any = v.safeParse(dataSchema,createhrm_job_positionsDto);
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
            "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
            token
          );
        }
        //throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      
      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createhrm_job_positionsDto, 'hrm_job_positions', 'create'), token);
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
      if(role === 'MAKER')
      {
        
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT tam.request_change(
            p_table_name     := 'hrm_job_positions',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'position_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct006_hrm'
          ) AS approval_id
        `);

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'hrm_job_positions creation request submitted for approval',
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
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

  async update(position_id:number, updatehrm_job_positionsDto: Prisma.hrm_job_positionsUpdateInput,token:string, detokenize:string,detokenizeData?: any) {   
    try{

      const dataSchema:any =  v.object({
          position_code :  v.optional(v.pipe(v.string(),v.maxLength(216 ))), 
          position_title :  v.optional(v.string()), 
          description :  v.optional(v.string()), 
          employment_type :  v.optional(v.string()), 
          experience_required :  v.optional(v.number()), 
          salary_range_min :  v.optional(v.number()), 
          salary_range_max :  v.optional(v.number()), 
          headcount :  v.optional(v.number()), 
          approved_headcount :  v.optional(v.number()), 
          filled_headcount :  v.optional(v.number()), 
          is_open :  v.optional(v.boolean()), 
          vacancy_status :  v.optional(v.string()), 
          remote_allowed :  v.optional(v.boolean()), 
          travel_required :  v.optional(v.boolean()), 
          job_family :  v.optional(v.string()), 
          job_level :  v.optional(v.string()), 
          additional_details :  v.optional(v.any()), 
          secure_data :  v.optional(v.any()), 
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
      let validate : any = v.safeParse(dataSchema,updatehrm_job_positionsDto);
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
            "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
            token
          );
        }
        //throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatehrm_job_positionsDto,'hrm_job_positions','update'), token);
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
    
    const currentVersion = (updatehrm_job_positionsDto as any)?.trs_version;
    if (currentVersion === undefined || currentVersion === null || currentVersion === '') {
      await this.prismaService.withConnection(() =>
        this.prismaService.hrm_job_positions.updateMany({
        where: {position_id},
        data: encryptedData
      }));
    }else{
      // Single atomic UPDATE guarded by id + trs_version; throws ConflictException (409)
      // when no row matches, i.e. another user already changed the record.
      // trs_version itself is stripped from the write — the DB trigger owns it.
      await this.prismaService.withConnection(() =>
        this.optimisticLockService.updateWithVersionCheck(this.prismaService, 'hrm_job_positions', {
          primaryKey: {position_id},
          currentVersion,
          data: encryptedData,
        }),
      );
    }

    const updated = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findMany({
      where: {position_id},
      select: {position_id:true,position_code:true,position_title:true,description:true,employment_type:true,experience_required:true,salary_range_min:true,salary_range_max:true,headcount:true,approved_headcount:true,filled_headcount:true,is_open:true,vacancy_status:true,remote_allowed:true,travel_required:true,job_family:true,job_level:true,additional_details:true,secure_data:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,hrm_employees:true,grade_id :true,}
    }));
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_job_positions');
    let decryptedRes: any = [];
    for (const indiviual of updated) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'hrm_job_positions');
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
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
position_id:number,
    updatehrm_job_positionsDto: Prisma.hrm_job_positionsUpdateInput,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const updateMaster_id =position_id;

      // =====================================================
      // CHECKER ROLE: Approve pending UPDATE request
      // =====================================================
      if (role === 'CHECKER') {

        if (!updateMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
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
              p_table_name      := 'hrm_job_positions',
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
            message: 'hrm_job_positions update approved and applied successfully',
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
                p_table_name      := 'hrm_job_positions',
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
              message: 'hrm_job_positions update rejected',
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
          position_code :  v.optional(v.pipe(v.string(),v.maxLength(216 ))), 
          position_title :  v.optional(v.string()), 
          description :  v.optional(v.string()), 
          employment_type :  v.optional(v.string()), 
          experience_required :  v.optional(v.number()), 
          salary_range_min :  v.optional(v.number()), 
          salary_range_max :  v.optional(v.number()), 
          headcount :  v.optional(v.number()), 
          approved_headcount :  v.optional(v.number()), 
          filled_headcount :  v.optional(v.number()), 
          is_open :  v.optional(v.boolean()), 
          vacancy_status :  v.optional(v.string()), 
          remote_allowed :  v.optional(v.boolean()), 
          travel_required :  v.optional(v.boolean()), 
          job_family :  v.optional(v.string()), 
          job_level :  v.optional(v.string()), 
          additional_details :  v.optional(v.any()), 
          secure_data :  v.optional(v.any()), 
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
      let validate : any = v.safeParse(dataSchema,updatehrm_job_positionsDto);
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
            "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
            token
          );
        }
        //throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }

      // Verify record exists
      const existingRecord = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findMany({
        where: {position_id}
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatehrm_job_positionsDto, 'hrm_job_positions', 'update'), token);
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
          p_table_name     := 'hrm_job_positions',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'position_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct006_hrm'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'hrm_job_positions update request submitted for approval',
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
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

  async remove(position_id:number,token : string, detokenize: string,detokenizeData?: any) {
    try{
    const toDelete = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findMany({
      where: {position_id},
      select: {position_id:true,position_code:true,position_title:true,description:true,employment_type:true,experience_required:true,salary_range_min:true,salary_range_max:true,headcount:true,approved_headcount:true,filled_headcount:true,is_open:true,vacancy_status:true,remote_allowed:true,travel_required:true,job_family:true,job_level:true,additional_details:true,secure_data:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,hrm_employees:true,grade_id :true,}
    })); 
    await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.deleteMany({
      where: {position_id}
    })); 
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_job_positions');
    let decryptedRes: any = [];
    for (const indiviual of toDelete) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'hrm_job_positions');
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
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
position_id:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const deleteMaster_id =position_id;

      // =====================================================
      // CHECKER ROLE: Approve pending DELETE request
      // =====================================================
      if (role === 'CHECKER') {

        if (!deleteMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT * FROM tam.approve_change_by_record(
              p_table_name      := 'hrm_job_positions',
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
            message: 'hrm_job_positions deletion approved and applied successfully',
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
                p_table_name      := 'hrm_job_positions',
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
              message: 'hrm_job_positions deletion rejected',
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
      this.prismaService.hrm_job_positions.findMany({
        where: {position_id  }
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT tam.request_change(
          p_table_name     := 'hrm_job_positions',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'position_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct006_hrm'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'hrm_job_positions deletion request submitted for approval',
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
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
  async findFirst(token : string, detokenize: string, detokenizeData?: any) {
    try{
      let res = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findFirst({ 
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
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_job_positions');
    } catch (error:any) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
  async findLast(token : string, detokenize: string ,detokenizeData?: any) {
    try{
      let res = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_job_positions.findFirst({ 
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
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_job_positions');
    } catch (error:any) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }

  async getLockById(key: string, value: any, token: string) {
    try {
      const decodedToken: any = this.jwtServices.decodeToken(token);
      const loginId = decodedToken.loginId;

      const locked = await this.ufservice.acquireLock({
        tableName: 'hrm_job_positions',
        key: key,
        value: value,
        userId: loginId,
      } as LockRecordDto);

      if (!locked.success) {
        throw new HttpException('Failed to acquire lock', HttpStatus.CONFLICT);
      }

      const res = await this.prismaService.withConnection(() =>
        this.prismaService.hrm_job_positions.findMany({
          where: { 
            [key]: value
          },
        }));

      const decryptedRes: any = [];
      for (const record of res) {
        const plain = await this.commonDecimalDatahandle(record);
        decryptedRes.push(await this.decryptData(plain, 'hrm_job_positions'));
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

  async releaseLockById(key: string, value: any, token: string) {
    try {
      const decodedToken: any = this.jwtServices.decodeToken(token);
      const loginId = decodedToken.loginId;

      await this.ufservice.releaseLock({
        tableName: 'hrm_job_positions',
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
        "CK:CT006:FNGK:AF:FNK:API-ERD:CATK:ECP:AFGK:HRM:AFK:hrmERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

}
