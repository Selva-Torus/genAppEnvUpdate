import { HttpException, Injectable,HttpStatus,InternalServerErrorException,ConflictException,BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CdcPrismaService } from '../cdc_prisma.service'; 
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { hrm_employeesEntity } from './entity/hrm_employees.entity';
import { CustomException } from 'src/customException';
import { JwtServices } from 'src/jwt.services';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { LockRecordDto } from 'src/dto';
import axios from 'axios';
import { OptimisticLockService } from 'src/optimistic-lock.service';
@Injectable()
export class hrm_employeesService {
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
       current_salary:data?.current_salary != null ? Number(data?.current_salary?.toString()) : null,
       annual_ctc:data?.annual_ctc != null ? Number(data?.annual_ctc?.toString()) : null,
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
            employee_id:"bigint",
            employee_code:"string",
            emp_number:"string",
            first_name:"string",
            middle_name:"string",
            last_name:"string",
            full_name:"string",
            preferred_name:"string",
            gender:"string",
            date_of_birth:"Date",
            marital_status:"string",
            personal_email:"string",
            work_email:"string",
            mobile:"string",
            alternate_mobile:"string",
            address_line1:"string",
            address_line2:"string",
            city:"string",
            state:"string",
            country:"string",
            postal_code:"string",
            nationality:"string",
            national_id:"string",
            passport_number:"string",
            blood_group:"string",
            employment_type:"string",
            employee_status:"string",
            hire_date:"Date",
            confirmation_date:"Date",
            probation_end:"Date",
            resignation_date:"Date",
            termination_date:"Date",
            exit_reason:"string",
            work_mode:"string",
            timezone:"string",
            reporting_manager_id:"bigint",
            hr_manager_id:"bigint",
            current_salary:"decimal",
            annual_ctc:"decimal",
            salary_currency:"string",
            bank_name:"string",
            bank_account:"string",
            bank_ifsc:"string",
            emergency_contact_name:"string",
            emergency_contact_phone:"string",
            emergency_contact_relation:"string",
            biometric_id:"string",
            profile_photo_url:"string",
            linkedin_profile:"string",
            skills_json:"json",
            education_history_json:"json",
            certifications_json:"json",
            family_details_json:"json",
            additional_details:"json",
            custom_attributes_json:"json",
            secure_data:"json",
            deleted_at:"Date",
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
      position_id :"number",      grade_id :"number",    }
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
      const { employee_id }: {employee_id : bigint} = queryValue;
      const { employee_code }: {employee_code : string} = queryValue;
      const { emp_number }: {emp_number : string} = queryValue;
      const { first_name }: {first_name : string} = queryValue;
      const { middle_name }: {middle_name : string} = queryValue;
      const { last_name }: {last_name : string} = queryValue;
      const { full_name }: {full_name : string} = queryValue;
      const { preferred_name }: {preferred_name : string} = queryValue;
      const { gender }: {gender : string} = queryValue;
      const { date_of_birth }: {date_of_birth : any } = queryValue;
      const { marital_status }: {marital_status : string} = queryValue;
      const { personal_email }: {personal_email : string} = queryValue;
      const { work_email }: {work_email : string} = queryValue;
      const { mobile }: {mobile : string} = queryValue;
      const { alternate_mobile }: {alternate_mobile : string} = queryValue;
      const { address_line1 }: {address_line1 : string} = queryValue;
      const { address_line2 }: {address_line2 : string} = queryValue;
      const { city }: {city : string} = queryValue;
      const { state }: {state : string} = queryValue;
      const { country }: {country : string} = queryValue;
      const { postal_code }: {postal_code : string} = queryValue;
      const { nationality }: {nationality : string} = queryValue;
      const { national_id }: {national_id : string} = queryValue;
      const { passport_number }: {passport_number : string} = queryValue;
      const { blood_group }: {blood_group : string} = queryValue;
      const { employment_type }: {employment_type : string} = queryValue;
      const { employee_status }: {employee_status : string} = queryValue;
      const { hire_date }: {hire_date : any } = queryValue;
      const { confirmation_date }: {confirmation_date : any } = queryValue;
      const { probation_end }: {probation_end : any } = queryValue;
      const { resignation_date }: {resignation_date : any } = queryValue;
      const { termination_date }: {termination_date : any } = queryValue;
      const { exit_reason }: {exit_reason : string} = queryValue;
      const { work_mode }: {work_mode : string} = queryValue;
      const { timezone }: {timezone : string} = queryValue;
      const { reporting_manager_id }: {reporting_manager_id : bigint} = queryValue;
      const { hr_manager_id }: {hr_manager_id : bigint} = queryValue;
      const { current_salary }: {current_salary : Date} = queryValue;
      const { annual_ctc }: {annual_ctc : Date} = queryValue;
      const { salary_currency }: {salary_currency : string} = queryValue;
      const { bank_name }: {bank_name : string} = queryValue;
      const { bank_account }: {bank_account : string} = queryValue;
      const { bank_ifsc }: {bank_ifsc : string} = queryValue;
      const { emergency_contact_name }: {emergency_contact_name : string} = queryValue;
      const { emergency_contact_phone }: {emergency_contact_phone : string} = queryValue;
      const { emergency_contact_relation }: {emergency_contact_relation : string} = queryValue;
      const { biometric_id }: {biometric_id : string} = queryValue;
      const { profile_photo_url }: {profile_photo_url : string} = queryValue;
      const { linkedin_profile }: {linkedin_profile : string} = queryValue;
      const { skills_json }: {skills_json : any } = queryValue;
      const { education_history_json }: {education_history_json : any } = queryValue;
      const { certifications_json }: {certifications_json : any } = queryValue;
      const { family_details_json }: {family_details_json : any } = queryValue;
      const { additional_details }: {additional_details : any } = queryValue;
      const { custom_attributes_json }: {custom_attributes_json : any } = queryValue;
      const { secure_data }: {secure_data : any } = queryValue;
      const { deleted_at }: {deleted_at :  Date} = queryValue;
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

      if(employee_id){ 
        query.employee_id = { [queryCondition['employee_id']]: employee_id };
      }
      if(employee_code){ 
        query.employee_code = { [queryCondition['employee_code']]: employee_code };
      }
      if(emp_number){ 
        query.emp_number = { [queryCondition['emp_number']]: emp_number };
      }
      if(first_name){ 
        query.first_name = { [queryCondition['first_name']]: first_name };
      }
      if(middle_name){ 
        query.middle_name = { [queryCondition['middle_name']]: middle_name };
      }
      if(last_name){ 
        query.last_name = { [queryCondition['last_name']]: last_name };
      }
      if(full_name){ 
        query.full_name = { [queryCondition['full_name']]: full_name };
      }
      if(preferred_name){ 
        query.preferred_name = { [queryCondition['preferred_name']]: preferred_name };
      }
      if(gender){ 
        query.gender = { [queryCondition['gender']]: gender };
      }
      if(date_of_birth){ 
        query.date_of_birth = { [queryCondition['date_of_birth']]: date_of_birth };
      }
      if(marital_status){ 
        query.marital_status = { [queryCondition['marital_status']]: marital_status };
      }
      if(personal_email){ 
        query.personal_email = { [queryCondition['personal_email']]: personal_email };
      }
      if(work_email){ 
        query.work_email = { [queryCondition['work_email']]: work_email };
      }
      if(mobile){ 
        query.mobile = { [queryCondition['mobile']]: mobile };
      }
      if(alternate_mobile){ 
        query.alternate_mobile = { [queryCondition['alternate_mobile']]: alternate_mobile };
      }
      if(address_line1){ 
        query.address_line1 = { [queryCondition['address_line1']]: address_line1 };
      }
      if(address_line2){ 
        query.address_line2 = { [queryCondition['address_line2']]: address_line2 };
      }
      if(city){ 
        query.city = { [queryCondition['city']]: city };
      }
      if(state){ 
        query.state = { [queryCondition['state']]: state };
      }
      if(country){ 
        query.country = { [queryCondition['country']]: country };
      }
      if(postal_code){ 
        query.postal_code = { [queryCondition['postal_code']]: postal_code };
      }
      if(nationality){ 
        query.nationality = { [queryCondition['nationality']]: nationality };
      }
      if(national_id){ 
        query.national_id = { [queryCondition['national_id']]: national_id };
      }
      if(passport_number){ 
        query.passport_number = { [queryCondition['passport_number']]: passport_number };
      }
      if(blood_group){ 
        query.blood_group = { [queryCondition['blood_group']]: blood_group };
      }
      if(employment_type){ 
        query.employment_type = { [queryCondition['employment_type']]: employment_type };
      }
      if(employee_status){ 
        query.employee_status = { [queryCondition['employee_status']]: employee_status };
      }
      if(hire_date){ 
        query.hire_date = { [queryCondition['hire_date']]: hire_date };
      }
      if(confirmation_date){ 
        query.confirmation_date = { [queryCondition['confirmation_date']]: confirmation_date };
      }
      if(probation_end){ 
        query.probation_end = { [queryCondition['probation_end']]: probation_end };
      }
      if(resignation_date){ 
        query.resignation_date = { [queryCondition['resignation_date']]: resignation_date };
      }
      if(termination_date){ 
        query.termination_date = { [queryCondition['termination_date']]: termination_date };
      }
      if(exit_reason){ 
        query.exit_reason = { [queryCondition['exit_reason']]: exit_reason };
      }
      if(work_mode){ 
        query.work_mode = { [queryCondition['work_mode']]: work_mode };
      }
      if(timezone){ 
        query.timezone = { [queryCondition['timezone']]: timezone };
      }
      if(reporting_manager_id){ 
        query.reporting_manager_id = { [queryCondition['reporting_manager_id']]: reporting_manager_id };
      }
      if(hr_manager_id){ 
        query.hr_manager_id = { [queryCondition['hr_manager_id']]: hr_manager_id };
      }
      if(current_salary){ 
        query.current_salary = { [queryCondition['current_salary']]: current_salary };
      }
      if(annual_ctc){ 
        query.annual_ctc = { [queryCondition['annual_ctc']]: annual_ctc };
      }
      if(salary_currency){ 
        query.salary_currency = { [queryCondition['salary_currency']]: salary_currency };
      }
      if(bank_name){ 
        query.bank_name = { [queryCondition['bank_name']]: bank_name };
      }
      if(bank_account){ 
        query.bank_account = { [queryCondition['bank_account']]: bank_account };
      }
      if(bank_ifsc){ 
        query.bank_ifsc = { [queryCondition['bank_ifsc']]: bank_ifsc };
      }
      if(emergency_contact_name){ 
        query.emergency_contact_name = { [queryCondition['emergency_contact_name']]: emergency_contact_name };
      }
      if(emergency_contact_phone){ 
        query.emergency_contact_phone = { [queryCondition['emergency_contact_phone']]: emergency_contact_phone };
      }
      if(emergency_contact_relation){ 
        query.emergency_contact_relation = { [queryCondition['emergency_contact_relation']]: emergency_contact_relation };
      }
      if(biometric_id){ 
        query.biometric_id = { [queryCondition['biometric_id']]: biometric_id };
      }
      if(profile_photo_url){ 
        query.profile_photo_url = { [queryCondition['profile_photo_url']]: profile_photo_url };
      }
      if(linkedin_profile){ 
        query.linkedin_profile = { [queryCondition['linkedin_profile']]: linkedin_profile };
      }
      if(skills_json){ 
        query.skills_json = { [queryCondition['skills_json']]: skills_json };
      }
      if(education_history_json){ 
        query.education_history_json = { [queryCondition['education_history_json']]: education_history_json };
      }
      if(certifications_json){ 
        query.certifications_json = { [queryCondition['certifications_json']]: certifications_json };
      }
      if(family_details_json){ 
        query.family_details_json = { [queryCondition['family_details_json']]: family_details_json };
      }
      if(additional_details){ 
        query.additional_details = { [queryCondition['additional_details']]: additional_details };
      }
      if(custom_attributes_json){ 
        query.custom_attributes_json = { [queryCondition['custom_attributes_json']]: custom_attributes_json };
      }
      if(secure_data){ 
        query.secure_data = { [queryCondition['secure_data']]: secure_data };
      }
      if(deleted_at){ 
        query.deleted_at = { [queryCondition['deleted_at']]: deleted_at };
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
        this.prismaService.hrm_employees.findMany({
          select:columns,
          where: query,          
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'hrm_employees');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.hrm_employees.findMany({
          select:columns,
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'hrm_employees');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_employees.findMany({
        select:columns,
        where: query,
        skip: skip,
        take: limit,
      }));

      const totalItems = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_employees.count({
        where: query,
      }));

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'hrm_employees');
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

  async findOne(employee_id:number,token : string,detokenize?: string,detokenizeData?: any) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_employees.findMany({ 
      where: {employee_id},
      select: {employee_id:true,employee_code:true,emp_number:true,first_name:true,middle_name:true,last_name:true,full_name:true,preferred_name:true,gender:true,date_of_birth:true,marital_status:true,personal_email:true,work_email:true,mobile:true,alternate_mobile:true,address_line1:true,address_line2:true,city:true,state:true,country:true,postal_code:true,nationality:true,national_id:true,passport_number:true,blood_group:true,employment_type:true,employee_status:true,hire_date:true,confirmation_date:true,probation_end:true,resignation_date:true,termination_date:true,exit_reason:true,work_mode:true,timezone:true,reporting_manager_id:true,hr_manager_id:true,current_salary:true,annual_ctc:true,salary_currency:true,bank_name:true,bank_account:true,bank_ifsc:true,emergency_contact_name:true,emergency_contact_phone:true,emergency_contact_relation:true,biometric_id:true,profile_photo_url:true,linkedin_profile:true,skills_json:true,education_history_json:true,certifications_json:true,family_details_json:true,additional_details:true,custom_attributes_json:true,secure_data:true,deleted_at:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,            hrm_employee_access_requests:{
              select:{
              access_req_id:true,              request_number:true,              request_type:true,              system_name:true,              access_role:true,              access_level:true,              business_justification:true,              request_priority:true,              risk_level:true,              approval_comments:true,              rejection_reason:true,              valid_from:true,              valid_to:true,              access_expiry_date:true,              provisioning_status:true,              provisioned_at:true,              provisioning_reference:true,              ticket_reference:true,              revoked_at:true,              revoked_by:true,              revoked_reason:true,              access_review_required:true,              last_reviewed_at:true,              reviewed_by:true,              attachments_json:true,              audit_metadata:true,              additional_details:true,              secure_data:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            hrm_employee_background_checks:{
              select:{
              check_id:true,              check_type:true,              vendor_name:true,              initiated_date:true,              completed_date:true,              result:true,              verification_status:true,              notes:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            hrm_employee_nda:{
              select:{
              nda_id:true,              nda_number:true,              nda_type:true,              signed_date:true,              expiry_date:true,              renewal_required:true,              signed_file_path:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            hrm_separation_checklists:{
              select:{
              checklist_id:true,              resignation_date:true,              last_working_day:true,              checklist_items:true,              access_revoked:true,              assets_returned:true,              hr_clearance:true,              separation_type:true,              resignation_reason:true,              exit_interview_rating:true,              final_settlement_status:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            hrm_performance_reviews:{
              select:{
              review_id:true,              review_number:true,              review_type:true,              review_status:true,              self_rating:true,              manager_rating:true,              final_rating:true,              improvements:true,              completed_at:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
            hrm_leave_requests:{
              select:{
              leave_req_id:true,              leave_request_number:true,              start_date:true,              end_date:true,              days_requested:true,              reason:true,              leave_reason_category:true,              half_day_flag:true,              half_day_session:true,              emergency_leave:true,              contact_during_leave:true,              handover_notes:true,              attachment_urls:true,              cancellation_reason:true,              cancelled_by:true,              cancelled_at:true,              rejection_reason:true,              approval_comments:true,              leave_balance_before:true,              leave_balance_afterd:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
position_id :true,grade_id :true,        }
    }));
    //return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_employees');
    let decryptedRes: any = [];
    for (const indiviual of res) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'hrm_employees');
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
      this.prismaService.hrm_employees.findMany({ 
      where: whereClause,
      select: {employee_id:true,employee_code:true,emp_number:true,first_name:true,middle_name:true,last_name:true,full_name:true,preferred_name:true,gender:true,date_of_birth:true,marital_status:true,personal_email:true,work_email:true,mobile:true,alternate_mobile:true,address_line1:true,address_line2:true,city:true,state:true,country:true,postal_code:true,nationality:true,national_id:true,passport_number:true,blood_group:true,employment_type:true,employee_status:true,hire_date:true,confirmation_date:true,probation_end:true,resignation_date:true,termination_date:true,exit_reason:true,work_mode:true,timezone:true,reporting_manager_id:true,hr_manager_id:true,current_salary:true,annual_ctc:true,salary_currency:true,bank_name:true,bank_account:true,bank_ifsc:true,emergency_contact_name:true,emergency_contact_phone:true,emergency_contact_relation:true,biometric_id:true,profile_photo_url:true,linkedin_profile:true,skills_json:true,education_history_json:true,certifications_json:true,family_details_json:true,additional_details:true,custom_attributes_json:true,secure_data:true,deleted_at:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,          hrm_employee_access_requests:{
              select:{
              access_req_id:true,              request_number:true,              request_type:true,              system_name:true,              access_role:true,              access_level:true,              business_justification:true,              request_priority:true,              risk_level:true,              approval_comments:true,              rejection_reason:true,              valid_from:true,              valid_to:true,              access_expiry_date:true,              provisioning_status:true,              provisioned_at:true,              provisioning_reference:true,              ticket_reference:true,              revoked_at:true,              revoked_by:true,              revoked_reason:true,              access_review_required:true,              last_reviewed_at:true,              reviewed_by:true,              attachments_json:true,              audit_metadata:true,              additional_details:true,              secure_data:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          hrm_employee_background_checks:{
              select:{
              check_id:true,              check_type:true,              vendor_name:true,              initiated_date:true,              completed_date:true,              result:true,              verification_status:true,              notes:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          hrm_employee_nda:{
              select:{
              nda_id:true,              nda_number:true,              nda_type:true,              signed_date:true,              expiry_date:true,              renewal_required:true,              signed_file_path:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          hrm_separation_checklists:{
              select:{
              checklist_id:true,              resignation_date:true,              last_working_day:true,              checklist_items:true,              access_revoked:true,              assets_returned:true,              hr_clearance:true,              separation_type:true,              resignation_reason:true,              exit_interview_rating:true,              final_settlement_status:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          hrm_performance_reviews:{
              select:{
              review_id:true,              review_number:true,              review_type:true,              review_status:true,              self_rating:true,              manager_rating:true,              final_rating:true,              improvements:true,              completed_at:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          hrm_leave_requests:{
              select:{
              leave_req_id:true,              leave_request_number:true,              start_date:true,              end_date:true,              days_requested:true,              reason:true,              leave_reason_category:true,              half_day_flag:true,              half_day_session:true,              emergency_leave:true,              contact_during_leave:true,              handover_notes:true,              attachment_urls:true,              cancellation_reason:true,              cancelled_by:true,              cancelled_at:true,              rejection_reason:true,              approval_comments:true,              leave_balance_before:true,              leave_balance_afterd:true,              additional_details:true,              doc_url:true,              trs_created_date:true,              trs_created_by:true,              trs_modified_date:true,              trs_modified_by:true,              trs_process_id:true,              trs_access_profile:true,              trs_org_grp_code:true,              trs_org_code:true,              trs_role_grp_code:true,              trs_role_code:true,              trs_ps_grp_code:true,              trs_ps_code:true,              trs_sub_org_grp_code:true,              trs_sub_org_code:true,              trs_locked_by:true,              trs_locked_time:true,              trs_tenant_id:true,              trs_app_code:true,              trs_product_code:true,              trs_event_process_status:true,              trs_event_status:true,              trs_token_id:true,              trs_version:true            ,
              }
            },
          position_id :true,    
          grade_id :true,    
      }
      }));
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'hrm_employees');
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
    
  async create(createhrm_employeesDto: Prisma.hrm_employeesCreateInput,token:string,detokenize:string,detokenizeData?: any) {
    try{

      const dataSchema:any =  v.object({
            employee_code :v.string() , 
            emp_number :v.string() , 
            first_name :v.string() , 
            middle_name :  v.optional(v.string()), 
            last_name :  v.optional(v.string()), 
            full_name :v.string() , 
            preferred_name :  v.optional(v.string()), 
            gender :  v.optional(v.string()), 
            date_of_birth :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            marital_status :  v.optional(v.string()), 
            personal_email :  v.optional(v.string()), 
            work_email :  v.optional(v.string()), 
            mobile :  v.optional(v.string()), 
            alternate_mobile :  v.optional(v.string()), 
            address_line1 :  v.optional(v.string()), 
            address_line2 :  v.optional(v.string()), 
            city :  v.optional(v.string()), 
            state :  v.optional(v.string()), 
            country :  v.optional(v.string()), 
            postal_code :  v.optional(v.string()), 
            nationality :  v.optional(v.string()), 
            national_id :  v.optional(v.string()), 
            passport_number :  v.optional(v.string()), 
            blood_group :  v.optional(v.string()), 
            employment_type :v.string() , 
            employee_status :v.string() , 
            hire_date :v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )  , 
            confirmation_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            probation_end :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            resignation_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            termination_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            exit_reason :  v.optional(v.string()), 
            work_mode :  v.optional(v.string()), 
            timezone :  v.optional(v.string()), 
            reporting_manager_id :  v.optional(v.number()), 
            hr_manager_id :  v.optional(v.number()), 
            current_salary :  v.optional(v.number()), 
            annual_ctc :  v.optional(v.number()), 
            salary_currency :  v.optional(v.string()), 
            bank_name :  v.optional(v.string()), 
            bank_account :  v.optional(v.string()), 
            bank_ifsc :  v.optional(v.string()), 
            emergency_contact_name :  v.optional(v.string()), 
            emergency_contact_phone :  v.optional(v.string()), 
            emergency_contact_relation :  v.optional(v.string()), 
            biometric_id :  v.optional(v.string()), 
            profile_photo_url :  v.optional(v.string()), 
            linkedin_profile :  v.optional(v.string()), 
            skills_json :  v.optional(v.any() ), 
            education_history_json :  v.optional(v.any() ), 
            certifications_json :  v.optional(v.any() ), 
            family_details_json :  v.optional(v.any() ), 
            additional_details :  v.optional(v.any() ), 
            custom_attributes_json :  v.optional(v.any() ), 
            secure_data :  v.optional(v.any() ), 
            deleted_at :  v.optional((v.any())), 
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
      let validate : any = v.safeParse(dataSchema,createhrm_employeesDto);
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
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createhrm_employeesDto, 'hrm_employees', 'create'), token);
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
        this.prismaService.hrm_employees.create({
          data: encryptedData,
          select:{employee_id:true,employee_code:true,emp_number:true,first_name:true,middle_name:true,last_name:true,full_name:true,preferred_name:true,gender:true,date_of_birth:true,marital_status:true,personal_email:true,work_email:true,mobile:true,alternate_mobile:true,address_line1:true,address_line2:true,city:true,state:true,country:true,postal_code:true,nationality:true,national_id:true,passport_number:true,blood_group:true,employment_type:true,employee_status:true,hire_date:true,confirmation_date:true,probation_end:true,resignation_date:true,termination_date:true,exit_reason:true,work_mode:true,timezone:true,reporting_manager_id:true,hr_manager_id:true,current_salary:true,annual_ctc:true,salary_currency:true,bank_name:true,bank_account:true,bank_ifsc:true,emergency_contact_name:true,emergency_contact_phone:true,emergency_contact_relation:true,biometric_id:true,profile_photo_url:true,linkedin_profile:true,skills_json:true,education_history_json:true,certifications_json:true,family_details_json:true,additional_details:true,custom_attributes_json:true,secure_data:true,deleted_at:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,hrm_employee_access_requests:true,hrm_employee_background_checks:true,hrm_employee_nda:true,hrm_separation_checklists:true,hrm_performance_reviews:true,hrm_leave_requests:true,position_id :true,grade_id :true,}          
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
    return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_employees');
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
    createhrm_employeesDto: Prisma.hrm_employeesCreateInput,
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
              message: 'hrm_employees creation approved and applied successfully',
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
              message: 'hrm_employees creation rejected',
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
            employee_code :v.string() , 
            emp_number :v.string() , 
            first_name :v.string() , 
            middle_name :  v.optional(v.string()), 
            last_name :  v.optional(v.string()), 
            full_name :v.string() , 
            preferred_name :  v.optional(v.string()), 
            gender :  v.optional(v.string()), 
            date_of_birth :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            marital_status :  v.optional(v.string()), 
            personal_email :  v.optional(v.string()), 
            work_email :  v.optional(v.string()), 
            mobile :  v.optional(v.string()), 
            alternate_mobile :  v.optional(v.string()), 
            address_line1 :  v.optional(v.string()), 
            address_line2 :  v.optional(v.string()), 
            city :  v.optional(v.string()), 
            state :  v.optional(v.string()), 
            country :  v.optional(v.string()), 
            postal_code :  v.optional(v.string()), 
            nationality :  v.optional(v.string()), 
            national_id :  v.optional(v.string()), 
            passport_number :  v.optional(v.string()), 
            blood_group :  v.optional(v.string()), 
            employment_type :v.string() , 
            employee_status :v.string() , 
            hire_date :v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )  , 
            confirmation_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            probation_end :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            resignation_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            termination_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            exit_reason :  v.optional(v.string()), 
            work_mode :  v.optional(v.string()), 
            timezone :  v.optional(v.string()), 
            reporting_manager_id :  v.optional(v.number()), 
            hr_manager_id :  v.optional(v.number()), 
            current_salary :  v.optional(v.number()), 
            annual_ctc :  v.optional(v.number()), 
            salary_currency :  v.optional(v.string()), 
            bank_name :  v.optional(v.string()), 
            bank_account :  v.optional(v.string()), 
            bank_ifsc :  v.optional(v.string()), 
            emergency_contact_name :  v.optional(v.string()), 
            emergency_contact_phone :  v.optional(v.string()), 
            emergency_contact_relation :  v.optional(v.string()), 
            biometric_id :  v.optional(v.string()), 
            profile_photo_url :  v.optional(v.string()), 
            linkedin_profile :  v.optional(v.string()), 
            skills_json :  v.optional(v.any() ), 
            education_history_json :  v.optional(v.any() ), 
            certifications_json :  v.optional(v.any() ), 
            family_details_json :  v.optional(v.any() ), 
            additional_details :  v.optional(v.any() ), 
            custom_attributes_json :  v.optional(v.any() ), 
            secure_data :  v.optional(v.any() ), 
            deleted_at :  v.optional((v.any())), 
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
      let validate : any = v.safeParse(dataSchema,createhrm_employeesDto);
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
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createhrm_employeesDto, 'hrm_employees', 'create'), token);
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
            p_table_name     := 'hrm_employees',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'employee_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct006_hrm'
          ) AS approval_id
        `);

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'hrm_employees creation request submitted for approval',
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

  async update(employee_id:number, updatehrm_employeesDto: Prisma.hrm_employeesUpdateInput,token:string, detokenize:string,detokenizeData?: any) {   
    try{

      const dataSchema:any =  v.object({
          employee_code :  v.optional(v.string()), 
          emp_number :  v.optional(v.string()), 
          first_name :  v.optional(v.string()), 
          middle_name :  v.optional(v.string()), 
          last_name :  v.optional(v.string()), 
          full_name :  v.optional(v.string()), 
          preferred_name :  v.optional(v.string()), 
          gender :  v.optional(v.string()), 
          date_of_birth :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          marital_status :  v.optional(v.string()), 
          personal_email :  v.optional(v.string()), 
          work_email :  v.optional(v.string()), 
          mobile :  v.optional(v.string()), 
          alternate_mobile :  v.optional(v.string()), 
          address_line1 :  v.optional(v.string()), 
          address_line2 :  v.optional(v.string()), 
          city :  v.optional(v.string()), 
          state :  v.optional(v.string()), 
          country :  v.optional(v.string()), 
          postal_code :  v.optional(v.string()), 
          nationality :  v.optional(v.string()), 
          national_id :  v.optional(v.string()), 
          passport_number :  v.optional(v.string()), 
          blood_group :  v.optional(v.string()), 
          employment_type :  v.optional(v.string()), 
          employee_status :  v.optional(v.string()), 
          hire_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          confirmation_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          probation_end :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          resignation_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          termination_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          exit_reason :  v.optional(v.string()), 
          work_mode :  v.optional(v.string()), 
          timezone :  v.optional(v.string()), 
          reporting_manager_id :  v.optional(v.number()), 
          hr_manager_id :  v.optional(v.number()), 
          current_salary :  v.optional(v.number()), 
          annual_ctc :  v.optional(v.number()), 
          salary_currency :  v.optional(v.string()), 
          bank_name :  v.optional(v.string()), 
          bank_account :  v.optional(v.string()), 
          bank_ifsc :  v.optional(v.string()), 
          emergency_contact_name :  v.optional(v.string()), 
          emergency_contact_phone :  v.optional(v.string()), 
          emergency_contact_relation :  v.optional(v.string()), 
          biometric_id :  v.optional(v.string()), 
          profile_photo_url :  v.optional(v.string()), 
          linkedin_profile :  v.optional(v.string()), 
          skills_json :  v.optional(v.any()), 
          education_history_json :  v.optional(v.any()), 
          certifications_json :  v.optional(v.any()), 
          family_details_json :  v.optional(v.any()), 
          additional_details :  v.optional(v.any()), 
          custom_attributes_json :  v.optional(v.any()), 
          secure_data :  v.optional(v.any()), 
          deleted_at :  v.optional((v.any())), 
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
      let validate : any = v.safeParse(dataSchema,updatehrm_employeesDto);
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
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatehrm_employeesDto,'hrm_employees','update'), token);
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
    
    const currentVersion = (updatehrm_employeesDto as any)?.trs_version;
    if (currentVersion === undefined || currentVersion === null || currentVersion === '') {
      await this.prismaService.withConnection(() =>
        this.prismaService.hrm_employees.updateMany({
        where: {employee_id},
        data: encryptedData
      }));
    }else{
      // Single atomic UPDATE guarded by id + trs_version; throws ConflictException (409)
      // when no row matches, i.e. another user already changed the record.
      // trs_version itself is stripped from the write — the DB trigger owns it.
      await this.prismaService.withConnection(() =>
        this.optimisticLockService.updateWithVersionCheck(this.prismaService, 'hrm_employees', {
          primaryKey: {employee_id},
          currentVersion,
          data: encryptedData,
        }),
      );
    }

    const updated = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_employees.findMany({
      where: {employee_id},
      select: {employee_id:true,employee_code:true,emp_number:true,first_name:true,middle_name:true,last_name:true,full_name:true,preferred_name:true,gender:true,date_of_birth:true,marital_status:true,personal_email:true,work_email:true,mobile:true,alternate_mobile:true,address_line1:true,address_line2:true,city:true,state:true,country:true,postal_code:true,nationality:true,national_id:true,passport_number:true,blood_group:true,employment_type:true,employee_status:true,hire_date:true,confirmation_date:true,probation_end:true,resignation_date:true,termination_date:true,exit_reason:true,work_mode:true,timezone:true,reporting_manager_id:true,hr_manager_id:true,current_salary:true,annual_ctc:true,salary_currency:true,bank_name:true,bank_account:true,bank_ifsc:true,emergency_contact_name:true,emergency_contact_phone:true,emergency_contact_relation:true,biometric_id:true,profile_photo_url:true,linkedin_profile:true,skills_json:true,education_history_json:true,certifications_json:true,family_details_json:true,additional_details:true,custom_attributes_json:true,secure_data:true,deleted_at:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,hrm_employee_access_requests:true,hrm_employee_background_checks:true,hrm_employee_nda:true,hrm_separation_checklists:true,hrm_performance_reviews:true,hrm_leave_requests:true,position_id :true,grade_id :true,}
    }));
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_employees');
    let decryptedRes: any = [];
    for (const indiviual of updated) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'hrm_employees');
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
employee_id:number,
    updatehrm_employeesDto: Prisma.hrm_employeesUpdateInput,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const updateMaster_id =employee_id;

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
              p_table_name      := 'hrm_employees',
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
            message: 'hrm_employees update approved and applied successfully',
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
                p_table_name      := 'hrm_employees',
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
              message: 'hrm_employees update rejected',
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
          employee_code :  v.optional(v.string()), 
          emp_number :  v.optional(v.string()), 
          first_name :  v.optional(v.string()), 
          middle_name :  v.optional(v.string()), 
          last_name :  v.optional(v.string()), 
          full_name :  v.optional(v.string()), 
          preferred_name :  v.optional(v.string()), 
          gender :  v.optional(v.string()), 
          date_of_birth :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          marital_status :  v.optional(v.string()), 
          personal_email :  v.optional(v.string()), 
          work_email :  v.optional(v.string()), 
          mobile :  v.optional(v.string()), 
          alternate_mobile :  v.optional(v.string()), 
          address_line1 :  v.optional(v.string()), 
          address_line2 :  v.optional(v.string()), 
          city :  v.optional(v.string()), 
          state :  v.optional(v.string()), 
          country :  v.optional(v.string()), 
          postal_code :  v.optional(v.string()), 
          nationality :  v.optional(v.string()), 
          national_id :  v.optional(v.string()), 
          passport_number :  v.optional(v.string()), 
          blood_group :  v.optional(v.string()), 
          employment_type :  v.optional(v.string()), 
          employee_status :  v.optional(v.string()), 
          hire_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          confirmation_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          probation_end :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          resignation_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          termination_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          exit_reason :  v.optional(v.string()), 
          work_mode :  v.optional(v.string()), 
          timezone :  v.optional(v.string()), 
          reporting_manager_id :  v.optional(v.number()), 
          hr_manager_id :  v.optional(v.number()), 
          current_salary :  v.optional(v.number()), 
          annual_ctc :  v.optional(v.number()), 
          salary_currency :  v.optional(v.string()), 
          bank_name :  v.optional(v.string()), 
          bank_account :  v.optional(v.string()), 
          bank_ifsc :  v.optional(v.string()), 
          emergency_contact_name :  v.optional(v.string()), 
          emergency_contact_phone :  v.optional(v.string()), 
          emergency_contact_relation :  v.optional(v.string()), 
          biometric_id :  v.optional(v.string()), 
          profile_photo_url :  v.optional(v.string()), 
          linkedin_profile :  v.optional(v.string()), 
          skills_json :  v.optional(v.any()), 
          education_history_json :  v.optional(v.any()), 
          certifications_json :  v.optional(v.any()), 
          family_details_json :  v.optional(v.any()), 
          additional_details :  v.optional(v.any()), 
          custom_attributes_json :  v.optional(v.any()), 
          secure_data :  v.optional(v.any()), 
          deleted_at :  v.optional((v.any())), 
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
      let validate : any = v.safeParse(dataSchema,updatehrm_employeesDto);
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
      this.prismaService.hrm_employees.findMany({
        where: {employee_id}
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatehrm_employeesDto, 'hrm_employees', 'update'), token);
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
          p_table_name     := 'hrm_employees',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'employee_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct006_hrm'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'hrm_employees update request submitted for approval',
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

  async remove(employee_id:number,token : string, detokenize: string,detokenizeData?: any) {
    try{
    const toDelete = await this.prismaService.withConnection(() =>
      this.prismaService.hrm_employees.findMany({
      where: {employee_id},
      select: {employee_id:true,employee_code:true,emp_number:true,first_name:true,middle_name:true,last_name:true,full_name:true,preferred_name:true,gender:true,date_of_birth:true,marital_status:true,personal_email:true,work_email:true,mobile:true,alternate_mobile:true,address_line1:true,address_line2:true,city:true,state:true,country:true,postal_code:true,nationality:true,national_id:true,passport_number:true,blood_group:true,employment_type:true,employee_status:true,hire_date:true,confirmation_date:true,probation_end:true,resignation_date:true,termination_date:true,exit_reason:true,work_mode:true,timezone:true,reporting_manager_id:true,hr_manager_id:true,current_salary:true,annual_ctc:true,salary_currency:true,bank_name:true,bank_account:true,bank_ifsc:true,emergency_contact_name:true,emergency_contact_phone:true,emergency_contact_relation:true,biometric_id:true,profile_photo_url:true,linkedin_profile:true,skills_json:true,education_history_json:true,certifications_json:true,family_details_json:true,additional_details:true,custom_attributes_json:true,secure_data:true,deleted_at:true,doc_url:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,hrm_employee_access_requests:true,hrm_employee_background_checks:true,hrm_employee_nda:true,hrm_separation_checklists:true,hrm_performance_reviews:true,hrm_leave_requests:true,position_id :true,grade_id :true,}
    })); 
    await this.prismaService.withConnection(() =>
      this.prismaService.hrm_employees.deleteMany({
      where: {employee_id}
    })); 
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_employees');
    let decryptedRes: any = [];
    for (const indiviual of toDelete) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'hrm_employees');
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
employee_id:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const deleteMaster_id =employee_id;

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
              p_table_name      := 'hrm_employees',
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
            message: 'hrm_employees deletion approved and applied successfully',
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
                p_table_name      := 'hrm_employees',
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
              message: 'hrm_employees deletion rejected',
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
      this.prismaService.hrm_employees.findMany({
        where: {employee_id  }
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT tam.request_change(
          p_table_name     := 'hrm_employees',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'employee_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct006_hrm'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'hrm_employees deletion request submitted for approval',
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
      this.prismaService.hrm_employees.findFirst({ 
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
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_employees');
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
      this.prismaService.hrm_employees.findFirst({ 
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
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'hrm_employees');
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
        tableName: 'hrm_employees',
        key: key,
        value: value,
        userId: loginId,
      } as LockRecordDto);

      if (!locked.success) {
        throw new HttpException('Failed to acquire lock', HttpStatus.CONFLICT);
      }

      const res = await this.prismaService.withConnection(() =>
        this.prismaService.hrm_employees.findMany({
          where: { 
            [key]: value
          },
        }));

      const decryptedRes: any = [];
      for (const record of res) {
        const plain = await this.commonDecimalDatahandle(record);
        decryptedRes.push(await this.decryptData(plain, 'hrm_employees'));
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
        tableName: 'hrm_employees',
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
