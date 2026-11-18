import { HttpException, Injectable,HttpStatus,InternalServerErrorException,ConflictException,BadRequestException } from '@nestjs/common';
import { Createrevocation_receiptDto } from './dto/Createrevocation_receipt.dto';
import { Updaterevocation_receiptDto } from './dto/Updaterevocation_receipt.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CdcPrismaService } from '../cdc_prisma.service'; 
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { revocation_receiptEntity } from './entity/revocation_receipt.entity';
import { CustomException, ForbiddenException, toHttpStatus } from 'src/customException';
import { JwtServices } from 'src/jwt.services';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { LockRecordDto } from 'src/dto';
import axios from 'axios';
import { OptimisticLockService } from 'src/optimistic-lock.service';
import { MAX_PAGE_SIZE, capTake } from 'src/pagination.util';
import { getModelFieldTypes } from 'src/utils/prisma-dmmf.util';
@Injectable()
export class revocation_receiptService {
  constructor(private readonly prismaService: PrismaService,
  private readonly cdcPrismaService: CdcPrismaService,
  private readonly commonService: CommonService,
  private readonly jwtServices: JwtServices,
  private readonly ufservice: UfService,
  private readonly optimisticLockService: OptimisticLockService) {}
  private encryptedCols: any={
  "ai_asset": [
    {
      "column": "ai_asset_model",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_asset_version",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_asset_tier_assessment",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_asset_data_class",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_asset_dependency",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_agent_control",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "audit_event",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "certification",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "evidence_export",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "evidence_item",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "agent_log_event",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "agent_session",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_passport",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "budget_quota",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "concern_report",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "evaluation_run",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "finding",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "incident",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "kill_switch_action",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ownership_assignment",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "policy_decision",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "telemetry_stream",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "tool_grant",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "usage_cost_daily",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "value_metric",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "alert",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "approval_request",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "asset_control_link",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "service_identity",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "authority_grant",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "ai_asset_model": [],
  "ai_asset_version": [
    {
      "column": "agent_capability",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "agent_manifest",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "agent_session",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_passport",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "evaluation_run",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "ai_asset_tier_assessment",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "ai_asset_tier_assessment": [],
  "ai_asset_data_class": [],
  "ai_asset_dependency": [],
  "ai_agent_control": [
    {
      "column": "ai_agent_action",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "ai_agent_action": [],
  "audit_event": [],
  "cert_template": [
    {
      "column": "cert_template_stage",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "certification",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "cert_template_stage": [
    {
      "column": "certification_stage",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "certification": [
    {
      "column": "certification_stage",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "approval_request",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "certification_condition": [],
  "certification_stage": [
    {
      "column": "certification_condition",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "discovery_staging": [],
  "evidence_export": [
    {
      "column": "evidence_export_item",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "evidence_export_item": [],
  "evidence_item": [],
  "integration_field_map": [],
  "integration_run": [],
  "integration_source": [
    {
      "column": "integration_field_map",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "integration_run",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "risk_rule": [
    {
      "column": "risk_rule_condition",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "risk_rule_condition": [],
  "sys_code_type": [
    {
      "column": "sys_code_value",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "sys_code_value": [],
  "agent_capability": [],
  "agent_log_event": [],
  "agent_manifest": [],
  "agent_session": [],
  "ai_passport": [],
  "budget_quota": [],
  "concern_report": [],
  "control": [
    {
      "column": "control_mapping",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "finding",
      "isRequired": true,
      "dataType": "childtable"
    },
    {
      "column": "asset_control_link",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "control_mapping": [],
  "credential_ref": [
    {
      "column": "service_identity",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "evaluation_run": [],
  "evaluation_suite": [
    {
      "column": "evaluation_run",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "examiner_grant": [],
  "finding": [],
  "incident": [
    {
      "column": "finding",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "kill_switch_action": [
    {
      "column": "revocation_receipt",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "monitoring_rule": [
    {
      "column": "alert",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "telemetry_stream": [
    {
      "column": "agent_log_event",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "tool_grant": [],
  "usage_cost_daily": [],
  "value_metric": [],
  "vendor": [],
  "ownership_assignment": [],
  "policy_rule": [
    {
      "column": "policy_decision",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "policy_decision": [],
  "promotion_rule": [],
  "regulatory_source": [
    {
      "column": "control_mapping",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "rate_card": [
    {
      "column": "usage_cost_daily",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "retention_policy": [],
  "revocation_receipt": [],
  "alert": [],
  "approval_action": [],
  "approval_request": [
    {
      "column": "approval_action",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "asset_control_link": [],
  "authority_grant": [],
  "risk_methodology": [],
  "service_identity": [],
  "sod_rule": []
}
  private readonly tokenizationRules:any = {
  "rules": {
    "fields": [],
    "version": "1.0"
  }
};    

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
            receipt_id:"bigint",
            enforcement_point:"string",
            command:"string",
            sent_at:"Date",
            acked_at:"Date",
            ack_status:"string",
            detail:"string",
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
      kill_action_id :"number",    }
    return data;
  }

 async findAllmethod(queryDto: any, limit:number, selectColumns:any, token:any, authContext?: any,sortingcolumns:any={}) {
  if (!authContext?.tenantId) {
     throw new ForbiddenException('TenantId is missing from the token');
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
      const { receipt_id }: {receipt_id : bigint} = queryValue;
      const { enforcement_point }: {enforcement_point : string} = queryValue;
      const { command }: {command : string} = queryValue;
      const { sent_at }: {sent_at : Date} = queryValue;
      const { acked_at }: {acked_at : Date} = queryValue;
      const { ack_status }: {ack_status : string} = queryValue;
      const { detail }: {detail : string} = queryValue;
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

      if(receipt_id){ 
        query.receipt_id = { [queryCondition['receipt_id']]: receipt_id };
      }
      if(enforcement_point){ 
        query.enforcement_point = { [queryCondition['enforcement_point']]: enforcement_point };
      }
      if(command){ 
        query.command = { [queryCondition['command']]: command };
      }
      if(sent_at){ 
        query.sent_at = { [queryCondition['sent_at']]: sent_at };
      }
      if(acked_at){ 
        query.acked_at = { [queryCondition['acked_at']]: acked_at };
      }
      if(ack_status){ 
        query.ack_status = { [queryCondition['ack_status']]: ack_status };
      }
      if(detail){ 
        query.detail = { [queryCondition['detail']]: detail };
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
      query.trs_tenant_id = authContext.tenantId;
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.findMany({
          select:columns,
          where: query,
          orderBy:sortingcolumns||{},   
          // Hard cap — this branch previously returned every matching row,
          // unbounded, when the caller filtered but didn't paginate.
          // take: MAX_PAGE_SIZE,         
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'revocation_receipt');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.findMany({
          select:columns,
          orderBy:sortingcolumns||{},
          // Hard cap — this branch previously returned the entire table,
          // unbounded, when the caller supplied neither a filter nor page/limit.
          // take: MAX_PAGE_SIZE,
        }));
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'revocation_receipt');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findMany({
        select:columns,
        where: query,
        skip: skip,
        orderBy:sortingcolumns||{},
        // Capped — previously a caller could pass an arbitrarily large
        // limit and get the whole matching set in one page anyway.
        take: capTake(limit),
      }));

      const totalItems = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.count({
        where: query,
      }));

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'revocation_receipt');
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

  async findOne(receipt_id:number,token : string,detokenize?: string,detokenizeData?: any,authContext?: any) {
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    try{
      const tenantFilter = { trs_tenant_id: authContext.tenantId };
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findMany({ 
      where: {receipt_id, ...tenantFilter },
      select: {receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,kill_action_id :true,        }
    }));
    //return await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt');
    let decryptedRes: any = [];
    for (const indiviual of res) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'revocation_receipt');
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
  }
  }

  async findAll(token : string,authContext?: any,detokenize?: string,detokenizeData?: any
) {
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    try{
      const whereClause: any = { trs_tenant_id: authContext.tenantId };
      const res = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findMany({ 
      where: whereClause,
      // Hard cap — this endpoint has no page/limit params to opt into
      // pagination, so it previously returned the entire table unbounded.
      // take: MAX_PAGE_SIZE,
      orderBy:{...detokenizeData?.sortingcolumns||{}},
      select: {receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,          kill_action_id :true,    
      }
      }));
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'revocation_receipt');
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
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
    }
    }
    
  async createMany(createrevocation_receiptDtos: Createrevocation_receiptDto[], token: string, detokenize: string, detokenizeData?: any, authContext?: any) {
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    if (!Array.isArray(createrevocation_receiptDtos) || createrevocation_receiptDtos.length === 0) {
      throw new BadRequestException('Request body must be a non-empty array of records');
    }
    try {

      const dataSchema:any =  v.object({
            enforcement_point :  v.optional(v.string()), 
            command :  v.optional(v.string()), 
            sent_at :  v.optional((v.any())), 
            acked_at :  v.optional((v.any())), 
            ack_status :  v.optional(v.string()), 
            detail :  v.optional(v.string()), 
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

      const encryptedRecords: any[] = [];
      for (const createrevocation_receiptDto of createrevocation_receiptDtos) {
        if (!createrevocation_receiptDto || typeof createrevocation_receiptDto !== 'object' || Array.isArray(createrevocation_receiptDto)) {
          throw new BadRequestException('Each record must be an object');
        }
        (createrevocation_receiptDto as any).trs_tenant_id = authContext.tenantId;

        const validate: any = v.safeParse(dataSchema, createrevocation_receiptDto);
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
              "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
              token
            );
          }
          throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
        }

        //let encryptedData: any = await this.normalizeDatesToUTC(await this.encryptData(createrevocation_receiptDto, 'revocation_receipt', 'create'), token);
        let encryptedData: any = createrevocation_receiptDto;
        if (this.tokenizationRules?.rules?.fields?.length > 0) {
          let tokenizedData = { ...this.tokenizationRules, payload: encryptedData };
          tokenizedData = await axios.post(
            `${process.env.TOKENIZATION_BASE_URL}/dynamic-tokenization`,
            tokenizedData,
            {
              headers: {
                'Content-Type': 'application/json',
                app_code: process.env.APPCODE,
                product_code: `${process.env.APPCODE}_${process.env.APPGROUPNAME}`,
                tnt_id: process.env.TENANT
              },
            }
          );
          encryptedData = tokenizedData?.data
          if ('tokenId' in encryptedData) {
            encryptedData.trs_token_id = encryptedData.tokenId;
            delete encryptedData.tokenId;
          }
        }
        // createMany/createManyAndReturn do not support nested relation writes
        // (e.g. a childtable's `create`), unlike the single-record `create`.
        // Drop any such relation payloads here so Prisma gets scalar fields only.
        //delete encryptedData?.childTableName;
        encryptedRecords.push(encryptedData);
      }

      let results: any[] = await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.createManyAndReturn({
          data: encryptedRecords,
          select:{receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true}
        })
      );

      const finalResults: any[] = [];
      for (let res of results) {
        if (detokenize === "true" && this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id) {
          let deTokenizedData = await axios.get(
            `${process.env.TOKENIZATION_BASE_URL}/detokenization/${res['trs_token_id']}`,
          )
          res = { ...res, ...deTokenizedData?.data };
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
        finalResults.push(await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt'));
      }
      return finalResults;
    } catch (error: any) {
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
        token
      );
      throw new InternalServerErrorException(errMsg.message);
    }
  }

  async create(createrevocation_receiptDto: Createrevocation_receiptDto,token:string,detokenize:string,detokenizeData?: any,authContext?: any) {
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    try{
      (createrevocation_receiptDto as any).trs_tenant_id = authContext.tenantId;

      const dataSchema:any =  v.object({
            enforcement_point :  v.optional(v.string()), 
            command :  v.optional(v.string()), 
            sent_at :  v.optional((v.any())), 
            acked_at :  v.optional((v.any())), 
            ack_status :  v.optional(v.string()), 
            detail :  v.optional(v.string()), 
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
      let validate : any = v.safeParse(dataSchema,createrevocation_receiptDto);
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
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createrevocation_receiptDto, 'revocation_receipt', 'create'), token);
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
        this.prismaService.revocation_receipt.create({
          data: encryptedData,
          select:{receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,kill_action_id :true,}          
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
    return await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt');
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
      "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
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
  // change was staged under the caller's own tenantId. That staged change
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
  // against the real tam schema) or the caller has no tenantId claim or the
  // staged tenantId doesn't match, this throws and blocks the approve/reject
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
      throw new ForbiddenException('Cannot verify tenantId ownership of this approval without a verified tenantId claim');
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
        `staged-tenantId lookup failed for approval_id=${approvalId} — TAM_STAGING_TABLE/TAM_APPROVAL_ID_COLUMN/TAM_CHANGES_COLUMN in ${this.constructor.name} do not match the real tam schema and need correcting. Underlying error: ${lookupError?.message ?? lookupError}`,
        'CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1',
        token,
      );
      throw new HttpException(
        'Unable to verify tenantId ownership of this approval',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const stagedTenant = rows?.[0]?.staged_tenant;
    if (!stagedTenant || stagedTenant !== callerTenant) {
      throw new ForbiddenException('This approval was staged under a different tenantId');
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
    createrevocation_receiptDto: Createrevocation_receiptDto,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string, approvalId?: string },
    token: string,
    authContext?: any,
  ) {
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    try {
      (createrevocation_receiptDto as any).trs_tenant_id = authContext.tenantId;
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
        // verified tenantId claim — so entitlement itself wasn't tenantId-scoped.
        // Passing authContext.tenantId here narrows that: the caller must
        // hold the AUTHORIZE capability within their *own* tenantId's
        // access-profile assignment, not merely within the deployment at
        // large.
        //
        // IMPORTANT — entitlement alone still isn't tenantId-specific to the
        // *target* approval_id. verifyPendingChangeTenant() below is a
        // best-effort attempt to close that: see its own comment block for
        // why it's UNVERIFIED against the real tam schema, and why it fails
        // closed rather than silently allowing the action if it can't
        // confirm the match.
        if (!(await this.ufservice.hasCapability(token, 'revocation_receipt:AUTHORIZE', authContext?.tenantId))) {
          throw new ForbiddenException('Caller is not entitled to authorize changes for revocation_receipt');
        }
        const approvalId = userInfo.approvalId;

        if (!approvalId) {
          throw new HttpException('approval_id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }
        // Q15 closure attempt — see verifyPendingChangeTenant()'s own
        // comment block above for the full caveat about these guessed
        // table/column names being unverified against the real database.
        await this.verifyPendingChangeTenant(+approvalId, authContext?.tenantId, token);
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
              message: 'revocation_receipt creation approved and applied successfully',
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
              message: 'revocation_receipt creation rejected',
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
            enforcement_point :  v.optional(v.string()), 
            command :  v.optional(v.string()), 
            sent_at :  v.optional((v.any())), 
            acked_at :  v.optional((v.any())), 
            ack_status :  v.optional(v.string()), 
            detail :  v.optional(v.string()), 
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
      let validate : any = v.safeParse(dataSchema,createrevocation_receiptDto);
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
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      
      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(createrevocation_receiptDto, 'revocation_receipt', 'create'), token);
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
            p_table_name     := 'revocation_receipt',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'receipt_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct003_tag'
          ) AS approval_id
        `);

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'revocation_receipt creation request submitted for approval',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
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

  async updateMany(updaterevocation_receiptDtos: Updaterevocation_receiptDto[], token: string, detokenize: string, detokenizeData?: any, authContext?: any) {
      if (!authContext?.tenantId) {
        throw new ForbiddenException('TenantId is missing from the token');
      }
      if (!Array.isArray(updaterevocation_receiptDtos) || updaterevocation_receiptDtos.length === 0) {
        throw new BadRequestException('Request body must be a non-empty array of records');
      }
      try {

      const dataSchema:any =  v.object({
          enforcement_point :  v.optional(v.string()), 
          command :  v.optional(v.string()), 
          sent_at :  v.optional((v.any())), 
          acked_at :  v.optional((v.any())), 
          ack_status :  v.optional(v.string()), 
          detail :  v.optional(v.string()), 
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
  
        const tenantFilter = { trs_tenant_id: authContext.tenantId };
        // id is a BigInt column, so Prisma reads it back as a bigint primitive.
        // These stay bigints so they compare equal to what the ownership query
        // returns — BigIntInterceptor only sanitizes the outgoing response, long
        // after this check runs, and `2n === 2` is false.
        const recordIds: bigint[] = [];
        const pendingUpdates: { receipt_id: bigint; currentVersion: any; data: any }[] = [];
  
        for (const updaterevocation_receiptDto of updaterevocation_receiptDtos) {
          if (!updaterevocation_receiptDto || typeof updaterevocation_receiptDto !== 'object' || Array.isArray(updaterevocation_receiptDto)) {
            throw new BadRequestException('Each record must be an object');
          }
          const rawId: any = (updaterevocation_receiptDto as any)?.receipt_id;
          if (rawId === undefined || rawId === null || rawId === '') {
            throw new BadRequestException('Each record must include an primary key');
          }
          let recordId: bigint;
          try {
            recordId = BigInt(rawId);
          } catch {
            throw new BadRequestException('Each record must include a valid numeric primary key');
          }
  
          const validate: any = v.safeParse(dataSchema, updaterevocation_receiptDto);
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
                "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
                token
              );
            }
            throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
          }
  
          //let encryptedData: any = await this.normalizeDatesToUTC(await this.encryptData(updaterevocation_receiptDto, 'revocation_receipt', 'update'), token);
          let encryptedData: any = updaterevocation_receiptDto;
          if (this.tokenizationRules?.rules?.fields?.length > 0) {
            let tokenizedData = { ...this.tokenizationRules, payload: encryptedData };
            tokenizedData = await axios.post(
              `${process.env.TOKENIZATION_BASE_URL}/dynamic-tokenization`,
              tokenizedData,
              {
                headers: {
                  'Content-Type': 'application/json',
                  app_code: process.env.APPCODE,
                  product_code: `${process.env.APPCODE}_${process.env.APPGROUPNAME}`,
                  tnt_id: process.env.TENANT
                },
              }
            );
            encryptedData = tokenizedData?.data
            if ('tokenId' in encryptedData) {
              encryptedData.trs_token_id = encryptedData.tokenId;
              delete encryptedData.tokenId;
            }
          }
          // The id only addresses the row here, it is never part of the write,
          // and updateMany does not support nested relation writes (e.g. a
          // childtable's `update`), so Prisma gets scalar fields only.
          delete encryptedData.receipt_id;
          //delete encryptedData.childtable;
  
          recordIds.push(recordId);
          pendingUpdates.push({ receipt_id: recordId, currentVersion: (updaterevocation_receiptDto as any)?.trs_version, data: encryptedData });
        }
  
        // One ownership check for the whole batch — a record belonging to another
        // tenantId fails the request before any row is written.
        const owned = await this.prismaService.withConnection(() =>
          this.prismaService.revocation_receipt.findMany({
            where: { receipt_id: { in: recordIds }, ...tenantFilter },
            select: { receipt_id: true, },
          }),
        );
        const ownedIds = new Set(owned.map((record: any) => record.receipt_id));
        const missingIds = recordIds.filter((recordId) => !ownedIds.has(recordId));
        if (missingIds.length > 0) {
          throw new CustomException(`Record not found: ${missingIds.join(', ')}`, HttpStatus.NOT_FOUND);
        }
  
        for (const pendingUpdate of pendingUpdates) {
          if (pendingUpdate.currentVersion === undefined || pendingUpdate.currentVersion === null || pendingUpdate.currentVersion === '') {
            await this.prismaService.withConnection(() =>
              this.prismaService.revocation_receipt.updateMany({
                where: { receipt_id: pendingUpdate.receipt_id, ...tenantFilter },
                data: pendingUpdate.data
              }));
          } else {
            // Single atomic UPDATE guarded by id + trs_version; throws ConflictException (409)
            // when no row matches, i.e. another user already changed the record.
            // trs_version itself is stripped from the write — the DB trigger owns it.
            await this.prismaService.withConnection(() =>
              this.optimisticLockService.updateWithVersionCheck(this.prismaService, 'revocation_receipt', {
                primaryKey: { receipt_id: pendingUpdate.receipt_id, ...tenantFilter },
                currentVersion: pendingUpdate.currentVersion,
                data: pendingUpdate.data,
              }),
            );
          }
        }
  
        const updated = await this.prismaService.withConnection(() =>
          this.prismaService.revocation_receipt.findMany({
            where: { receipt_id: { in: recordIds }, ...tenantFilter },
            select:{receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true}
        }));
  
        const finalResults: any[] = [];
        for (let res of updated) {
          if (detokenize === "true" && this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id) {
            let deTokenizedData = await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${res['trs_token_id']}`,
            )
            res = { ...res, ...deTokenizedData?.data };
          }
  
          if (this.tokenizationRules?.rules?.fields?.length > 0 && res?.trs_token_id && Object.keys(detokenizeData || {}).length > 0) {
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
          finalResults.push(await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt'));
        }
        return finalResults;
      } catch (error: any) {
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
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
      }
  }

  async update(receipt_id:number, updaterevocation_receiptDto: Updaterevocation_receiptDto,token:string, detokenize:string,detokenizeData?: any,authContext?: any) {   
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    try{
      const owned = await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.findFirst({
          where: {receipt_id, trs_tenant_id: authContext.tenantId },
          select: {receipt_id:true, },
        }),
      );
      if (!owned) {
        throw new CustomException('Record not found', HttpStatus.NOT_FOUND);
      }

      const dataSchema:any =  v.object({
          enforcement_point :  v.optional(v.string()), 
          command :  v.optional(v.string()), 
          sent_at :  v.optional((v.any())), 
          acked_at :  v.optional((v.any())), 
          ack_status :  v.optional(v.string()), 
          detail :  v.optional(v.string()), 
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
      let validate : any = v.safeParse(dataSchema,updaterevocation_receiptDto);
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
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updaterevocation_receiptDto,'revocation_receipt','update'), token);
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
    
    const currentVersion = (updaterevocation_receiptDto as any)?.trs_version;
    if (currentVersion === undefined || currentVersion === null || currentVersion === '') {
      await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.updateMany({
        where: {receipt_id},
        data: encryptedData
      }));
    }else{
      // Single atomic UPDATE guarded by id + trs_version; throws ConflictException (409)
      // when no row matches, i.e. another user already changed the record.
      // trs_version itself is stripped from the write — the DB trigger owns it.
      await this.prismaService.withConnection(() =>
        this.optimisticLockService.updateWithVersionCheck(this.prismaService, 'revocation_receipt', {
          primaryKey: {receipt_id},
          currentVersion,
          data: encryptedData,
        }),
      );
    }

    const updated = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findMany({
      where: {receipt_id},
      select: {receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true}
    }));
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt');
    let decryptedRes: any = [];
    for (const indiviual of updated) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'revocation_receipt');
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
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
receipt_id:number,
    updaterevocation_receiptDto: Updaterevocation_receiptDto,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string,
    authContext?: any,
  ) {
    try {
      // Fail closed when the JWT has no tenantId claim — without a verified
      // tenantId we cannot prove ownership of the record being changed.
      if (!authContext?.tenantId) {
        throw new ForbiddenException('TenantId is missing from the token');
      }
      const workflowRole = userInfo.role?.toUpperCase();
      const updateMaster_id =receipt_id;

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
        if (!(await this.ufservice.hasCapability(token, 'revocation_receipt:AUTHORIZE', authContext?.tenantId))) {
          throw new ForbiddenException('Caller is not entitled to authorize changes for revocation_receipt');
        }

        // Close the tenantId-blindness half of R2: the pending change's
        // target row still exists in its pre-change state until approved,
        // so its current tenantId is checkable here even though the pending
        // change payload itself isn't.
        const targetRecord = await this.prismaService.revocation_receipt.findFirst({
          where: {receipt_id },
          select: { trs_tenant_id: true },
        });
        if (targetRecord && targetRecord.trs_tenant_id !== authContext.tenantId) {
          throw new ForbiddenException('Record belongs to a different tenantId');
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
              p_table_name      := 'revocation_receipt',
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
            message: 'revocation_receipt update approved and applied successfully',
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
                p_table_name      := 'revocation_receipt',
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
              message: 'revocation_receipt update rejected',
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
          enforcement_point :  v.optional(v.string()), 
          command :  v.optional(v.string()), 
          sent_at :  v.optional((v.any())), 
          acked_at :  v.optional((v.any())), 
          ack_status :  v.optional(v.string()), 
          detail :  v.optional(v.string()), 
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
      let validate : any = v.safeParse(dataSchema,updaterevocation_receiptDto);
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
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
            token
          );
        }
        throw new CustomException(allErrors, HttpStatus.BAD_REQUEST);
      }

      // Verify record exists
      const existingRecord = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findMany({
        where: {receipt_id}
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      let encryptedData = await this.normalizeDatesToUTC(await this.encryptData(updaterevocation_receiptDto, 'revocation_receipt', 'update'), token);
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
          p_table_name     := 'revocation_receipt',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'receipt_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct003_tag'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'revocation_receipt update request submitted for approval',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
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

  async deleteMany(ids: { receipt_id: bigint }[], token: string, detokenize: string, detokenizeData?: any, authContext?: any) {
    // Fail closed when the JWT has no tenantId claim — without a verified
    // tenantId we cannot scope the deletion to the caller's own rows.
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('Request body must be a non-empty array of records');
    }
    try {
      const tenantFilter = { trs_tenant_id: authContext.tenantId };
      // id is a BigInt column, so Prisma reads it back as a bigint primitive.
      // These stay bigints so they compare equal to what the lookup below
      // returns — BigIntInterceptor only sanitizes the outgoing response, long
      // after this check runs, and `2n === 2` is false.
      const recordIds: bigint[] = [];
      for (const item of ids) {
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
          throw new BadRequestException('Each record must be an object containing an primary key');
        }
        const id: any = (item as any)?.receipt_id;
        if (id === undefined || id === null || id === '') {
          throw new BadRequestException('Each record must include an primary key');
        }
        try {
          recordIds.push(BigInt(id));
        } catch {
          throw new BadRequestException('Each record must include a valid numeric primary key');
        }
      }

      const toDelete = await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.findMany({
          where: { receipt_id: { in: recordIds }, ...tenantFilter },
          select: {receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true}
        }));

      // Nothing is deleted unless every requested id belongs to this tenantId —
      // a partial delete would be impossible for the caller to unwind.
      const foundIds = new Set(toDelete.map((record: any) => record.receipt_id));
      const missingIds = recordIds.filter((recordId) => !foundIds.has(recordId));
      if (missingIds.length > 0) {
        throw new CustomException(`Record not found: ${missingIds.join(', ')}`, HttpStatus.NOT_FOUND);
      }

      await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.deleteMany({
          where: { receipt_id: { in: recordIds }, ...tenantFilter }
        }));

      let decryptedRes: any = [];
      for (const indiviual of toDelete) {
        const plain = await this.commonDecimalDatahandle(indiviual)
        const decryptedData = await this.decryptData(plain, 'revocation_receipt');
        decryptedRes.push(decryptedData);
      }
      if (this.tokenizationRules?.rules?.fields?.length > 0 && detokenize == 'true') {
        for (let data = 0; data < decryptedRes.length; data++) {
          if (decryptedRes[data]?.trs_token_id) {
            let deTokenizedData = await axios.get(
              `${process.env.TOKENIZATION_BASE_URL}/detokenization/${decryptedRes[data]['trs_token_id']}`,
            )
            deTokenizedData = deTokenizedData.data;
            decryptedRes[data] = { ...decryptedRes[data], ...deTokenizedData };
          }
        }
      }
      if (this.tokenizationRules?.rules?.fields?.length > 0 && Object.keys(detokenizeData || {}).length > 0) {
        for (let data = 0; data < decryptedRes.length; data++) {
          if (!decryptedRes[data]?.trs_token_id) {
            continue;
          }
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
      return decryptedRes;
    } catch (error: any) {
      if (error instanceof CustomException || error instanceof HttpException) {
        throw error;
      }
      const errorMessage = 'Error in remove Data';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG026",
        error,
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

  async remove(receipt_id:number,token : string, detokenize: string,detokenizeData?: any,authContext?: any) {
    try{
    // Fail closed when the JWT has no tenantId claim — without a verified
    // tenantId we cannot scope the deletion to the caller's own rows.
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }
    const tenantFilter = { trs_tenant_id: authContext.tenantId };

    const toDelete = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findMany({
      where: {receipt_id ,...tenantFilter},
      select: {receipt_id:true,enforcement_point:true,command:true,sent_at:true,acked_at:true,ack_status:true,detail:true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_grp_code:true,trs_sub_org_code:true,trs_locked_by:true,trs_locked_time:true,trs_tenant_id:true,trs_app_code:true,trs_product_code:true,trs_event_process_status:true,trs_event_status:true,trs_token_id:true,trs_version:true,kill_action_id :true,}
    })); 
    await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.deleteMany({
      where: {receipt_id ,...tenantFilter}
    })); 
    // return await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt');
    let decryptedRes: any = [];
    for (const indiviual of toDelete) {
      const plain = await this.commonDecimalDatahandle(indiviual)
      const decryptedData = await this.decryptData(plain, 'revocation_receipt');
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
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
receipt_id:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string,
    authContext?: any,
  ) {
    try {
      // Fail closed when the JWT has no tenantId claim — without a verified
      // tenantId we cannot prove ownership of the record being changed.
      if (!authContext?.tenantId) {
        throw new ForbiddenException('TenantId is missing from the token');
      }
      const workflowRole = userInfo.role?.toUpperCase();
      const deleteMaster_id =receipt_id;

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
        if (!(await this.ufservice.hasCapability(token, 'revocation_receipt:AUTHORIZE', authContext?.tenantId))) {
          throw new ForbiddenException('Caller is not entitled to authorize changes for revocation_receipt');
        }

        // Close the tenantId-blindness half of R2: the pending change's
        // target row still exists in its pre-change state until approved,
        // so its current tenantId is checkable here.
        const targetRecord = await this.prismaService.revocation_receipt.findFirst({
          where: {receipt_id },
          select: { trs_tenant_id: true },
        });
        if (targetRecord && targetRecord.trs_tenant_id !== authContext.tenantId) {
          throw new ForbiddenException('Record belongs to a different tenantId');
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.cdcPrismaService.withConnection(() =>
        this.cdcPrismaService.$queryRaw<any[]>`
          SELECT * FROM tam.approve_change_by_record(
              p_table_name      := 'revocation_receipt',
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
            message: 'revocation_receipt deletion approved and applied successfully',
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
                p_table_name      := 'revocation_receipt',
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
              message: 'revocation_receipt deletion rejected',
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
      this.prismaService.revocation_receipt.findMany({
        where: {receipt_id  }
      }));

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.cdcPrismaService.withConnection(() =>
      this.cdcPrismaService.$queryRaw<any[]>`
        SELECT tam.request_change(
          p_table_name     := 'revocation_receipt',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'receipt_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct003_tag'
        ) AS approval_id
      `);

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'revocation_receipt deletion request submitted for approval',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
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
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }

    try{
      let res = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findFirst({ 
        where: { trs_tenant_id: authContext.tenantId },
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
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt');
    } catch (error:any) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
      }
  }
  async findLast(token : string, detokenize: string ,detokenizeData?: any, authContext?: any) {
    if (!authContext?.tenantId) {
      throw new ForbiddenException('TenantId is missing from the token');
    }

    try{
      let res = await this.prismaService.withConnection(() =>
      this.prismaService.revocation_receipt.findFirst({ 
        where: { trs_tenant_id: authContext.tenantId },
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
      return await this.decryptData(await this.commonDecimalDatahandle(res), 'revocation_receipt');
    } catch (error:any) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, toHttpStatus(error));
      }
  }

  async getLockById(key: string, value: any, token: string) {
    try {
      const decodedToken: any = this.jwtServices.verifyToken(token);
      const loginId = decodedToken.loginId;

      // Allow-list `key` against real revocation_receipt columns (via Prisma DMMF) —
      // previously this was concatenated straight into the lock's raw SQL,
      // letting any authenticated caller inject SQL through this field.
      const allowedKeys = Object.keys(getModelFieldTypes('revocation_receipt'));
      if (typeof key !== 'string' || !allowedKeys.includes(key)) {
        throw new BadRequestException(`Invalid lock key: ${key}`);
      }

      const locked = await this.ufservice.acquireLock({
        tableName: 'revocation_receipt',
        key: key,
        value: value,
        userId: loginId,
      } as LockRecordDto);

      if (!locked.success) {
        throw new HttpException('Failed to acquire lock', HttpStatus.CONFLICT);
      }

      const res = await this.prismaService.withConnection(() =>
        this.prismaService.revocation_receipt.findMany({
          where: { 
            [key]: value
          },
        }));

      const decryptedRes: any = [];
      for (const record of res) {
        const plain = await this.commonDecimalDatahandle(record);
        decryptedRes.push(await this.decryptData(plain, 'revocation_receipt'));
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

  async releaseLockById(key: string, value: any, token: string) {
    try {
      const decodedToken: any = this.jwtServices.verifyToken(token);
      const loginId = decodedToken.loginId;

      // Allow-list `key` against real revocation_receipt columns (via Prisma DMMF) —
      // previously this was concatenated straight into the unlock's raw SQL,
      // letting any authenticated caller inject SQL through this field.
      const allowedKeys = Object.keys(getModelFieldTypes('revocation_receipt'));
      if (typeof key !== 'string' || !allowedKeys.includes(key)) {
        throw new BadRequestException(`Invalid lock key: ${key}`);
      }

      await this.ufservice.releaseLock({
        tableName: 'revocation_receipt',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:TAG:AFGK:TAG:AFK:tagERD:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, toHttpStatus(error));
    }
  }

}
