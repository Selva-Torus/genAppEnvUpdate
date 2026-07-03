

import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CdcPrismaService } from '../cdc_prisma.service'; 
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { wps_mohre_salary_dtlEntity } from './entity/wps_mohre_salary_dtl.entity';
import { CustomException } from 'src/customException';
@Injectable()
export class wps_mohre_salary_dtlService {
  constructor(private readonly prismaService: PrismaService,
  private readonly cdcPrismaService: CdcPrismaService,
  private readonly commonService: CommonService) {}
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
  "wps_mohre_salary_dtl": []
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
       fixed_income:data?.fixed_income != null ? Number(data?.fixed_income?.toString()) : null,
       variable_income:data?.variable_income != null ? Number(data?.variable_income?.toString()) : null,
       total_benefits:data?.total_benefits != null ? Number(data?.total_benefits?.toString()) : null,
       total_deductions:data?.total_deductions != null ? Number(data?.total_deductions?.toString()) : null,
       total_allowance:data?.total_allowance != null ? Number(data?.total_allowance?.toString()) : null,
       total_incentives:data?.total_incentives != null ? Number(data?.total_incentives?.toString()) : null,
       total_salary:data?.total_salary != null ? Number(data?.total_salary?.toString()) : null,
       net_pay:data?.net_pay != null ? Number(data?.net_pay?.toString()) : null,
       bonus:data?.bonus != null ? Number(data?.bonus?.toString()) : null,
       refund_amount:data?.refund_amount != null ? Number(data?.refund_amount?.toString()) : null,
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
            wpsmsd_id:"bigint",
            wpsmac_id:"bigint",
            employer_eid:"string",
            employer_mol_number:"string",
            employer_reg_id:"string",
            employee_eid:"string",
            employee_mol_number:"string",
            employee_unified_number:"string",
            fixed_income:"decimal",
            variable_income:"decimal",
            total_leaves:"number",
            salary_type:"string",
            employee_passport_number:"string",
            from_date:"Date",
            to_date:"Date",
            agent_code:"string",
            salary_year:"string",
            salary_payment_date:"string",
            total_benefits:"decimal",
            total_deductions:"decimal",
            total_allowance:"decimal",
            total_incentives:"decimal",
            days_paid:"number",
            total_salary:"decimal",
            is_inside_country:"string",
            period:"string",
            remarks:"string",
            allowance:"json",
            deduction:"json",
            incentives:"json",
            benefits:"json",
            channel_code:"string",
            employee_iban:"string",
            process_name:"string",
            employer_name:"string",
            employee_name:"string",
            net_pay:"decimal",
            bonus:"decimal",
            sif_name:"string",
            sal_tran_ref_number:"string",
            work_permit_number:"string",
            wps_status:"string",
            employee_count:"number",
            refund_amount:"decimal",
            refund_reason:"string",
            refund_tran_ref_no:"string",
            refund_tran_date:"Date",
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
      const { wpsmsd_id }: {wpsmsd_id : bigint} = queryValue;
      const { wpsmac_id }: {wpsmac_id : bigint} = queryValue;
      const { employer_eid }: {employer_eid : string} = queryValue;
      const { employer_mol_number }: {employer_mol_number : string} = queryValue;
      const { employer_reg_id }: {employer_reg_id : string} = queryValue;
      const { employee_eid }: {employee_eid : string} = queryValue;
      const { employee_mol_number }: {employee_mol_number : string} = queryValue;
      const { employee_unified_number }: {employee_unified_number : string} = queryValue;
      const { fixed_income }: {fixed_income : Date} = queryValue;
      const { variable_income }: {variable_income : Date} = queryValue;
      const { total_leaves }: {total_leaves : number} = queryValue;
      const { salary_type }: {salary_type : string} = queryValue;
      const { employee_passport_number }: {employee_passport_number : string} = queryValue;
      const { from_date }: {from_date : any } = queryValue;
      const { to_date }: {to_date : any } = queryValue;
      const { agent_code }: {agent_code : string} = queryValue;
      const { salary_year }: {salary_year : string} = queryValue;
      const { salary_payment_date }: {salary_payment_date : string} = queryValue;
      const { total_benefits }: {total_benefits : Date} = queryValue;
      const { total_deductions }: {total_deductions : Date} = queryValue;
      const { total_allowance }: {total_allowance : Date} = queryValue;
      const { total_incentives }: {total_incentives : Date} = queryValue;
      const { days_paid }: {days_paid : number} = queryValue;
      const { total_salary }: {total_salary : Date} = queryValue;
      const { is_inside_country }: {is_inside_country : string} = queryValue;
      const { period }: {period : string} = queryValue;
      const { remarks }: {remarks : string} = queryValue;
      const { allowance }: {allowance : any } = queryValue;
      const { deduction }: {deduction : any } = queryValue;
      const { incentives }: {incentives : any } = queryValue;
      const { benefits }: {benefits : any } = queryValue;
      const { channel_code }: {channel_code : string} = queryValue;
      const { employee_iban }: {employee_iban : string} = queryValue;
      const { process_name }: {process_name : string} = queryValue;
      const { employer_name }: {employer_name : string} = queryValue;
      const { employee_name }: {employee_name : string} = queryValue;
      const { net_pay }: {net_pay : Date} = queryValue;
      const { bonus }: {bonus : Date} = queryValue;
      const { sif_name }: {sif_name : string} = queryValue;
      const { sal_tran_ref_number }: {sal_tran_ref_number : string} = queryValue;
      const { work_permit_number }: {work_permit_number : string} = queryValue;
      const { wps_status }: {wps_status : string} = queryValue;
      const { employee_count }: {employee_count : number} = queryValue;
      const { refund_amount }: {refund_amount : Date} = queryValue;
      const { refund_reason }: {refund_reason : string} = queryValue;
      const { refund_tran_ref_no }: {refund_tran_ref_no : string} = queryValue;
      const { refund_tran_date }: {refund_tran_date : any } = queryValue;
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

      if(wpsmsd_id){ 
        query.wpsmsd_id = { [queryCondition['wpsmsd_id']]: wpsmsd_id };
      }
      if(wpsmac_id){ 
        query.wpsmac_id = { [queryCondition['wpsmac_id']]: wpsmac_id };
      }
      if(employer_eid){ 
        query.employer_eid = { [queryCondition['employer_eid']]: employer_eid };
      }
      if(employer_mol_number){ 
        query.employer_mol_number = { [queryCondition['employer_mol_number']]: employer_mol_number };
      }
      if(employer_reg_id){ 
        query.employer_reg_id = { [queryCondition['employer_reg_id']]: employer_reg_id };
      }
      if(employee_eid){ 
        query.employee_eid = { [queryCondition['employee_eid']]: employee_eid };
      }
      if(employee_mol_number){ 
        query.employee_mol_number = { [queryCondition['employee_mol_number']]: employee_mol_number };
      }
      if(employee_unified_number){ 
        query.employee_unified_number = { [queryCondition['employee_unified_number']]: employee_unified_number };
      }
      if(fixed_income){ 
        query.fixed_income = { [queryCondition['fixed_income']]: fixed_income };
      }
      if(variable_income){ 
        query.variable_income = { [queryCondition['variable_income']]: variable_income };
      }
      if(total_leaves){ 
        query.total_leaves = { [queryCondition['total_leaves']]: total_leaves };
      }
      if(salary_type){ 
        query.salary_type = { [queryCondition['salary_type']]: salary_type };
      }
      if(employee_passport_number){ 
        query.employee_passport_number = { [queryCondition['employee_passport_number']]: employee_passport_number };
      }
      if(from_date){ 
        query.from_date = { [queryCondition['from_date']]: from_date };
      }
      if(to_date){ 
        query.to_date = { [queryCondition['to_date']]: to_date };
      }
      if(agent_code){ 
        query.agent_code = { [queryCondition['agent_code']]: agent_code };
      }
      if(salary_year){ 
        query.salary_year = { [queryCondition['salary_year']]: salary_year };
      }
      if(salary_payment_date){ 
        query.salary_payment_date = { [queryCondition['salary_payment_date']]: salary_payment_date };
      }
      if(total_benefits){ 
        query.total_benefits = { [queryCondition['total_benefits']]: total_benefits };
      }
      if(total_deductions){ 
        query.total_deductions = { [queryCondition['total_deductions']]: total_deductions };
      }
      if(total_allowance){ 
        query.total_allowance = { [queryCondition['total_allowance']]: total_allowance };
      }
      if(total_incentives){ 
        query.total_incentives = { [queryCondition['total_incentives']]: total_incentives };
      }
      if(days_paid){ 
        query.days_paid = { [queryCondition['days_paid']]: days_paid };
      }
      if(total_salary){ 
        query.total_salary = { [queryCondition['total_salary']]: total_salary };
      }
      if(is_inside_country){ 
        query.is_inside_country = { [queryCondition['is_inside_country']]: is_inside_country };
      }
      if(period){ 
        query.period = { [queryCondition['period']]: period };
      }
      if(remarks){ 
        query.remarks = { [queryCondition['remarks']]: remarks };
      }
      if(allowance){ 
        query.allowance = { [queryCondition['allowance']]: allowance };
      }
      if(deduction){ 
        query.deduction = { [queryCondition['deduction']]: deduction };
      }
      if(incentives){ 
        query.incentives = { [queryCondition['incentives']]: incentives };
      }
      if(benefits){ 
        query.benefits = { [queryCondition['benefits']]: benefits };
      }
      if(channel_code){ 
        query.channel_code = { [queryCondition['channel_code']]: channel_code };
      }
      if(employee_iban){ 
        query.employee_iban = { [queryCondition['employee_iban']]: employee_iban };
      }
      if(process_name){ 
        query.process_name = { [queryCondition['process_name']]: process_name };
      }
      if(employer_name){ 
        query.employer_name = { [queryCondition['employer_name']]: employer_name };
      }
      if(employee_name){ 
        query.employee_name = { [queryCondition['employee_name']]: employee_name };
      }
      if(net_pay){ 
        query.net_pay = { [queryCondition['net_pay']]: net_pay };
      }
      if(bonus){ 
        query.bonus = { [queryCondition['bonus']]: bonus };
      }
      if(sif_name){ 
        query.sif_name = { [queryCondition['sif_name']]: sif_name };
      }
      if(sal_tran_ref_number){ 
        query.sal_tran_ref_number = { [queryCondition['sal_tran_ref_number']]: sal_tran_ref_number };
      }
      if(work_permit_number){ 
        query.work_permit_number = { [queryCondition['work_permit_number']]: work_permit_number };
      }
      if(wps_status){ 
        query.wps_status = { [queryCondition['wps_status']]: wps_status };
      }
      if(employee_count){ 
        query.employee_count = { [queryCondition['employee_count']]: employee_count };
      }
      if(refund_amount){ 
        query.refund_amount = { [queryCondition['refund_amount']]: refund_amount };
      }
      if(refund_reason){ 
        query.refund_reason = { [queryCondition['refund_reason']]: refund_reason };
      }
      if(refund_tran_ref_no){ 
        query.refund_tran_ref_no = { [queryCondition['refund_tran_ref_no']]: refund_tran_ref_no };
      }
      if(refund_tran_date){ 
        query.refund_tran_date = { [queryCondition['refund_tran_date']]: refund_tran_date };
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
        this.prismaService.wps_mohre_salary_dtl.findMany({
          select:columns,
          where: query,          
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'wps_mohre_salary_dtl');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.wps_mohre_salary_dtl.findMany({
          select:columns,
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'wps_mohre_salary_dtl');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.findMany({
        select:columns,
        where: query,
        skip: skip,
        take: limit,
      }));

      const totalItems = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.count({
        where: query,
      }));

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'wps_mohre_salary_dtl');
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

  async findOne(wpsmsd_id:number,token : string) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.findMany({ 
      where: {wpsmsd_id},
      select: {wpsmsd_id:true,wpsmac_id:true,employer_eid:true,employer_mol_number:true,employer_reg_id:true,employee_eid:true,employee_mol_number:true,employee_unified_number:true,fixed_income:true,variable_income:true,total_leaves:true,salary_type:true,employee_passport_number:true,from_date:true,to_date:true,agent_code:true,salary_year:true,salary_payment_date:true,total_benefits:true,total_deductions:true,total_allowance:true,total_incentives:true,days_paid:true,total_salary:true,is_inside_country:true,period:true,remarks:true,allowance:true,deduction:true,incentives:true,benefits:true,channel_code:true,employee_iban:true,process_name:true,employer_name:true,employee_name:true,net_pay:true,bonus:true,sif_name:true,sal_tran_ref_number:true,work_permit_number:true,wps_status:true,employee_count:true,refund_amount:true,refund_reason:true,refund_tran_ref_no:true,refund_tran_date:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,        }
    }));
    //return await this.decryptData(await this.commonDecimalDatahandle(res), 'wps_mohre_salary_dtl');
    let decryptedRes: any = [];
    for (const indiviual of res) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'wps_mohre_salary_dtl');
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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
      this.prismaService.wps_mohre_salary_dtl.findMany({ 
      where: whereClause,
      select: {wpsmsd_id:true,wpsmac_id:true,employer_eid:true,employer_mol_number:true,employer_reg_id:true,employee_eid:true,employee_mol_number:true,employee_unified_number:true,fixed_income:true,variable_income:true,total_leaves:true,salary_type:true,employee_passport_number:true,from_date:true,to_date:true,agent_code:true,salary_year:true,salary_payment_date:true,total_benefits:true,total_deductions:true,total_allowance:true,total_incentives:true,days_paid:true,total_salary:true,is_inside_country:true,period:true,remarks:true,allowance:true,deduction:true,incentives:true,benefits:true,channel_code:true,employee_iban:true,process_name:true,employer_name:true,employee_name:true,net_pay:true,bonus:true,sif_name:true,sal_tran_ref_number:true,work_permit_number:true,wps_status:true,employee_count:true,refund_amount:true,refund_reason:true,refund_tran_ref_no:true,refund_tran_date:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,      }
      }));
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'wps_mohre_salary_dtl');
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
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }
    }
    
  async create(createwps_mohre_salary_dtlDto: Prisma.wps_mohre_salary_dtlCreateInput,token:string) {
    try{

      const dataSchema:any =  v.object({
            wpsmsd_id :v.number() , 
            wpsmac_id :  v.optional(v.number()), 
            employer_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employer_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employer_reg_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_unified_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            fixed_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            variable_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_leaves :  v.optional(v.number()), 
            salary_type :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_passport_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            from_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            to_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            agent_code :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            salary_year :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
            salary_payment_date :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            total_benefits :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_deductions :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_allowance :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_incentives :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            days_paid :  v.optional(v.number()), 
            total_salary :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            is_inside_country :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
            period :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            remarks :  v.optional(v.pipe(v.string(),v.maxLength(2048 ))), 
            allowance :  v.optional(v.any() ), 
            deduction :  v.optional(v.any() ), 
            incentives :  v.optional(v.any() ), 
            benefits :  v.optional(v.any() ), 
            channel_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            employee_iban :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            process_name :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employer_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
            employee_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
            net_pay :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            bonus :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            sif_name :  v.optional(v.pipe(v.string(),v.maxLength(512 ))), 
            sal_tran_ref_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            work_permit_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            wps_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_count :  v.optional(v.number()), 
            refund_amount :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            refund_reason :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            refund_tran_ref_no :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            refund_tran_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
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
        let validate : any = v.safeParse(dataSchema,createwps_mohre_salary_dtlDto);
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
            "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
            token
          );
        }
      const encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createwps_mohre_salary_dtlDto, 'wps_mohre_salary_dtl', 'create'), token);
      const res = await this.prismaService.withConnection(() =>
        this.prismaService.wps_mohre_salary_dtl.create({
          data: encryptedData,
          select:{wpsmsd_id:true,wpsmac_id:true,employer_eid:true,employer_mol_number:true,employer_reg_id:true,employee_eid:true,employee_mol_number:true,employee_unified_number:true,fixed_income:true,variable_income:true,total_leaves:true,salary_type:true,employee_passport_number:true,from_date:true,to_date:true,agent_code:true,salary_year:true,salary_payment_date:true,total_benefits:true,total_deductions:true,total_allowance:true,total_incentives:true,days_paid:true,total_salary:true,is_inside_country:true,period:true,remarks:true,allowance:true,deduction:true,incentives:true,benefits:true,channel_code:true,employee_iban:true,process_name:true,employer_name:true,employee_name:true,net_pay:true,bonus:true,sif_name:true,sal_tran_ref_number:true,work_permit_number:true,wps_status:true,employee_count:true,refund_amount:true,refund_reason:true,refund_tran_ref_no:true,refund_tran_date:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,}          
        })
      );
    return await this.decryptData(await this.commonDecimalDatahandle(res), 'wps_mohre_salary_dtl');
  } catch (error:any) {
    const errMsg = parsePrismaCreateError(error);
    const errorMessage = 'Create Error';
    await this.commonService.errorLog(
      "Technical",
      'AK',
      'Fatal',
      "TG022",
      errMsg.message,
      "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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
    createwps_mohre_salary_dtlDto: Prisma.wps_mohre_salary_dtlCreateInput,
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
            SELECT <clientCode>_tam.approve_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `);
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'wps_mohre_salary_dtl creation approved and applied successfully',
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
            SELECT <clientCode>_tam.reject_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `);
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'wps_mohre_salary_dtl creation rejected',
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
            wpsmsd_id :v.number() , 
            wpsmac_id :  v.optional(v.number()), 
            employer_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employer_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employer_reg_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_unified_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            fixed_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            variable_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_leaves :  v.optional(v.number()), 
            salary_type :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_passport_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            from_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            to_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
            agent_code :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            salary_year :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
            salary_payment_date :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            total_benefits :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_deductions :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_allowance :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            total_incentives :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            days_paid :  v.optional(v.number()), 
            total_salary :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            is_inside_country :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
            period :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            remarks :  v.optional(v.pipe(v.string(),v.maxLength(2048 ))), 
            allowance :  v.optional(v.any() ), 
            deduction :  v.optional(v.any() ), 
            incentives :  v.optional(v.any() ), 
            benefits :  v.optional(v.any() ), 
            channel_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
            employee_iban :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
            process_name :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employer_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
            employee_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
            net_pay :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            bonus :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            sif_name :  v.optional(v.pipe(v.string(),v.maxLength(512 ))), 
            sal_tran_ref_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            work_permit_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            wps_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            employee_count :  v.optional(v.number()), 
            refund_amount :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
            refund_reason :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            refund_tran_ref_no :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
            refund_tran_date :  v.optional(v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )), 
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
        let validate : any = v.safeParse(dataSchema,createwps_mohre_salary_dtlDto);
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
            "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
            token
          );
          throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }
      
      // Encrypt data if needed
      const encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createwps_mohre_salary_dtlDto, 'wps_mohre_salary_dtl', 'create'), token);
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
        
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT <clientCode>_tam.request_change(
            p_table_name     := 'wps_mohre_salary_dtl',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'wpsmsd_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'CT007_ag001'
          ) AS approval_id
        `);

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'wps_mohre_salary_dtl creation request submitted for approval',
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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

  async update(wpsmsd_id:number, updatewps_mohre_salary_dtlDto: Prisma.wps_mohre_salary_dtlUpdateInput,token:string) {   
    try{

      const dataSchema:any =  v.object({
          wpsmac_id :  v.optional(v.number()), 
          employer_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employer_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employer_reg_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_unified_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          fixed_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          variable_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_leaves :  v.optional(v.number()), 
          salary_type :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_passport_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          from_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          to_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          agent_code :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          salary_year :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
          salary_payment_date :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          total_benefits :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_deductions :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_allowance :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_incentives :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          days_paid :  v.optional(v.number()), 
          total_salary :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          is_inside_country :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
          period :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          remarks :  v.optional(v.pipe(v.string(),v.maxLength(2048 ))), 
          allowance :  v.optional(v.any()), 
          deduction :  v.optional(v.any()), 
          incentives :  v.optional(v.any()), 
          benefits :  v.optional(v.any()), 
          channel_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          employee_iban :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          process_name :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employer_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
          employee_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
          net_pay :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          bonus :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          sif_name :  v.optional(v.pipe(v.string(),v.maxLength(512 ))), 
          sal_tran_ref_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          work_permit_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          wps_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_count :  v.optional(v.number()), 
          refund_amount :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          refund_reason :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          refund_tran_ref_no :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          refund_tran_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
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
      let validate : any = v.safeParse(dataSchema,updatewps_mohre_salary_dtlDto);
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
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
          token
        );
      }
      const encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatewps_mohre_salary_dtlDto,'wps_mohre_salary_dtl','update'), token);
      await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.updateMany({
      where: {wpsmsd_id},
      data: encryptedData
    }));
    const updated = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.findMany({
      where: {wpsmsd_id},
      select: {wpsmsd_id:true,wpsmac_id:true,employer_eid:true,employer_mol_number:true,employer_reg_id:true,employee_eid:true,employee_mol_number:true,employee_unified_number:true,fixed_income:true,variable_income:true,total_leaves:true,salary_type:true,employee_passport_number:true,from_date:true,to_date:true,agent_code:true,salary_year:true,salary_payment_date:true,total_benefits:true,total_deductions:true,total_allowance:true,total_incentives:true,days_paid:true,total_salary:true,is_inside_country:true,period:true,remarks:true,allowance:true,deduction:true,incentives:true,benefits:true,channel_code:true,employee_iban:true,process_name:true,employer_name:true,employee_name:true,net_pay:true,bonus:true,sif_name:true,sal_tran_ref_number:true,work_permit_number:true,wps_status:true,employee_count:true,refund_amount:true,refund_reason:true,refund_tran_ref_no:true,refund_tran_date:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,}
    }));
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'wps_mohre_salary_dtl');
    let decryptedRes: any = [];
    for (const indiviual of updated) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'wps_mohre_salary_dtl');
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
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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
wpsmsd_id:number,
    updatewps_mohre_salary_dtlDto: Prisma.wps_mohre_salary_dtlUpdateInput,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const updateMaster_id =wpsmsd_id;

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
          SELECT * FROM <clientCode>_tam.approve_change_by_record(
              p_table_name      := 'wps_mohre_salary_dtl',
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
            message: 'wps_mohre_salary_dtl update approved and applied successfully',
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
            SELECT * FROM <clientCode>_tam.reject_change_by_record(
                p_table_name      := 'wps_mohre_salary_dtl',
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
              message: 'wps_mohre_salary_dtl update rejected',
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
          wpsmac_id :  v.optional(v.number()), 
          employer_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employer_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employer_reg_id :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_eid :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_mol_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_unified_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          fixed_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          variable_income :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_leaves :  v.optional(v.number()), 
          salary_type :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_passport_number :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          from_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          to_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          agent_code :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          salary_year :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
          salary_payment_date :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          total_benefits :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_deductions :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_allowance :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          total_incentives :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          days_paid :  v.optional(v.number()), 
          total_salary :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          is_inside_country :  v.optional(v.pipe(v.string(),v.maxLength(8 ))), 
          period :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          remarks :  v.optional(v.pipe(v.string(),v.maxLength(2048 ))), 
          allowance :  v.optional(v.any()), 
          deduction :  v.optional(v.any()), 
          incentives :  v.optional(v.any()), 
          benefits :  v.optional(v.any()), 
          channel_code :  v.optional(v.pipe(v.string(),v.maxLength(16 ))), 
          employee_iban :  v.optional(v.pipe(v.string(),v.maxLength(32 ))), 
          process_name :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employer_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
          employee_name :  v.optional(v.pipe(v.string(),v.maxLength(128 ))), 
          net_pay :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          bonus :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          sif_name :  v.optional(v.pipe(v.string(),v.maxLength(512 ))), 
          sal_tran_ref_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          work_permit_number :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          wps_status :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          employee_count :  v.optional(v.number()), 
          refund_amount :  v.optional(v.pipe(v.number(),v.maxValue(9999999999999999999 ))), 
          refund_reason :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          refund_tran_ref_no :  v.optional(v.pipe(v.string(),v.maxLength(64 ))), 
          refund_tran_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
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
      let validate : any = v.safeParse(dataSchema,updatewps_mohre_salary_dtlDto);
      if (!validate.success) {
        const errorMessage = validate.issues[0].message;
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG025",
          errorMessage,
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
          token
        );
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }

      // Verify record exists
      const existingRecord = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.findMany({
        where: {wpsmsd_id}
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      const encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updatewps_mohre_salary_dtlDto, 'wps_mohre_salary_dtl', 'update'), token);

      // Call request_change() for UPDATE
      // For UPDATE: p_record_id is the ID, p_changes contains only changed fields
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT <clientCode>_tam.request_change(
          p_table_name     := 'wps_mohre_salary_dtl',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'wpsmsd_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'CT007_ag001'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'wps_mohre_salary_dtl update request submitted for approval',
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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

  async remove(wpsmsd_id:number,token : string) {
    try{
    const toDelete = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.findMany({
      where: {wpsmsd_id},
      select: {wpsmsd_id:true,wpsmac_id:true,employer_eid:true,employer_mol_number:true,employer_reg_id:true,employee_eid:true,employee_mol_number:true,employee_unified_number:true,fixed_income:true,variable_income:true,total_leaves:true,salary_type:true,employee_passport_number:true,from_date:true,to_date:true,agent_code:true,salary_year:true,salary_payment_date:true,total_benefits:true,total_deductions:true,total_allowance:true,total_incentives:true,days_paid:true,total_salary:true,is_inside_country:true,period:true,remarks:true,allowance:true,deduction:true,incentives:true,benefits:true,channel_code:true,employee_iban:true,process_name:true,employer_name:true,employee_name:true,net_pay:true,bonus:true,sif_name:true,sal_tran_ref_number:true,work_permit_number:true,wps_status:true,employee_count:true,refund_amount:true,refund_reason:true,refund_tran_ref_no:true,refund_tran_date:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,}
    })); 
    await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.deleteMany({
      where: {wpsmsd_id}
    })); 
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'wps_mohre_salary_dtl');
    let decryptedRes: any = [];
    for (const indiviual of toDelete) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'wps_mohre_salary_dtl');
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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
wpsmsd_id:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const deleteMaster_id =wpsmsd_id;

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
          SELECT * FROM <clientCode>_tam.approve_change_by_record(
              p_table_name      := 'wps_mohre_salary_dtl',
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
            message: 'wps_mohre_salary_dtl deletion approved and applied successfully',
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
            SELECT * FROM <clientCode>_tam.reject_change_by_record(
                p_table_name      := 'wps_mohre_salary_dtl',
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
              message: 'wps_mohre_salary_dtl deletion rejected',
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
      this.prismaService.wps_mohre_salary_dtl.findMany({
        where: {wpsmsd_id  }
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT <clientCode>_tam.request_change(
          p_table_name     := 'wps_mohre_salary_dtl',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'wpsmsd_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'CT007_ag001'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'wps_mohre_salary_dtl deletion request submitted for approval',
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
        "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
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
      this.prismaService.wps_mohre_salary_dtl.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      }));
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'wps_mohre_salary_dtl');
    } catch (error:any) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
  async findLast(token : string) {
    try{
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.wps_mohre_salary_dtl.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      }));
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'wps_mohre_salary_dtl');
    } catch (error:any) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT005:FNGK:AF:FNK:API-ERD:CATK:GSS:AFGK:VGPH:AFK:WPS_MOHRE_ERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }

}
