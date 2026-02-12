
import { HttpException, Injectable,HttpStatus,InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as v from 'valibot';
import { errorObj } from 'src/dto';
import { CommonService } from 'src/common.Service';
import { parsePrismaCreateError } from 'src/prisma-error-handler';
import { claims_detailEntity } from './entity/claims_detail.entity';
import { CustomException } from 'src/customException';
@Injectable()
export class claims_detailService {
  constructor(private readonly prismaService: PrismaService,
  private readonly commonService: CommonService) {}
  private encryptedCols: any={
  "claims": [
    {
      "column": "claims_detail",
      "isRequired": true,
      "dataType": "childtable"
    }
  ],
  "claims_detail": [],
  "codedescription": []
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
      claim_detail_id:"number",
      expense_category:"string",
      expense_description:"string",
      expense_date:"Date",
      expense_amount:"number",
      name:"string",
      attachment:"string",
      claim_category:"string",
      claim_id :"number",      trs_created_date:"Date",
      trs_created_by:"string",
      trs_modified_date:"Date",
      trs_modified_by:"string",
      trs_next_status:"string",
      trs_status:"string",
      trs_process_id:"string",
      trs_access_profile:"string",
      trs_org_grp_code:"string",
      trs_org_code:"string",
      trs_role_grp_code:"string",
      trs_role_code:"string",
      trs_ps_grp_code:"string",
      trs_ps_code:"string",
      trs_sub_org_grp_code:"string",
      trs_sub_org_code:"string"
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
      const { claim_detail_id }: {claim_detail_id : number} = queryValue;
      const { expense_category }: {expense_category : string} = queryValue;
      const { expense_description }: {expense_description : string} = queryValue;
      const { expense_date }: {expense_date : any } = queryValue;
      const { expense_amount }: {expense_amount : number} = queryValue;
      const { name }: {name : string} = queryValue;
      const { attachment }: {attachment : string} = queryValue;
      const { claim_category }: {claim_category : string} = queryValue;

      if(claim_detail_id){ 
        query.claim_detail_id = { [queryCondition['claim_detail_id']]: claim_detail_id };
      }
      if(expense_category){ 
        query.expense_category = { [queryCondition['expense_category']]: expense_category };
      }
      if(expense_description){ 
        query.expense_description = { [queryCondition['expense_description']]: expense_description };
      }
      if(expense_date){ 
        query.expense_date = { [queryCondition['expense_date']]: expense_date };
      }
      if(expense_amount){ 
        query.expense_amount = { [queryCondition['expense_amount']]: expense_amount };
      }
      if(name){ 
        query.name = { [queryCondition['name']]: name };
      }
      if(attachment){ 
        query.attachment = { [queryCondition['attachment']]: attachment };
      }
      if(claim_category){ 
        query.claim_category = { [queryCondition['claim_category']]: claim_category };
      }
      const skip = (page - 1) * limit;
      if (Object.keys(query).length > 0) {
        const banks = await this.prismaService.claims_detail.findMany({
          select:columns,
          where: query,          
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'claims_detail');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      if(!skip && !limit && Object.keys(query).length == 0){
        const banks = await this.prismaService.claims_detail.findMany({
          select:columns,
        });
        let decryptedRes: any = [];
        for (const indiviual of banks) {
          const decryptedData = await this.decryptData(indiviual, 'claims_detail');
          decryptedRes.push(decryptedData);
        }
        return decryptedRes;
      }

      const banks = await this.prismaService.claims_detail.findMany({
        select:columns,
        where: query,
        skip: skip,
        take: limit,
      });

      const totalItems = await this.prismaService.claims_detail.count({
        where: query,
      });

      let decryptedRes: any = [];
      for (const indiviual of banks) {
        const decryptedData = await this.decryptData(indiviual, 'claims_detail');
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
        error,
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
    }
  }

  async findOne(claim_detail_id:number,token : string) {
    try{
      const res = await this.prismaService.claims_detail.findUnique({ 
      where: {claim_detail_id},
      select: {claim_detail_id:true,expense_category:true,expense_description:true,expense_date:true,expense_amount:true,name:true,attachment:true,claim_category:true,claim_id :true,        trs_created_date:true,
        trs_created_by:true,
        trs_modified_date:true,
        trs_modified_by:true,
        trs_next_status:true,
        trs_status:true,
        trs_process_id:true,
        trs_access_profile:true,
        trs_org_grp_code:true,
        trs_org_code:true,
        trs_role_grp_code:true,
        trs_role_code:true,
        trs_ps_grp_code:true,
        trs_ps_code:true,
        trs_sub_org_code:true,
        trs_sub_org_grp_code:true
        }
    });
    return  await this.decryptData(res, 'claims_detail');
  } catch (error) {
    const errorMessage = 'Error in findOne';
      await this.commonService.errorLog(
        "Technical",
        'AK',
        'Fatal',
        "TG024",
        error,
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
        token
      );
      throw new CustomException(errorMessage, error);
  }
  }

  async findAll(token : string,trs_created_date?: Date,trs_created_by?: string,trs_modified_date?: Date,trs_modified_by?: string,trs_next_status?: string,trs_status?: string,trs_process_id?: string,trs_access_profile?: string,trs_org_grp_code?: string,trs_org_code?: string,trs_role_grp_code?: string,trs_role_code?: string,trs_ps_grp_code?: string,trs_ps_code?: string,trs_sub_org_grp_code?: string,trs_sub_org_code?: string
) {
    try{
      const whereClause: any = {};
      if (trs_created_date) {
        whereClause.trs_created_date = trs_created_date;
      }
      if (trs_created_by) {
        whereClause.trs_created_by = trs_created_by;
      }
      if (trs_modified_date) {
        whereClause.trs_modified_date = trs_modified_date;
      }
      if (trs_modified_by) {
        whereClause.trs_modified_by = trs_modified_by;
      }
      if (trs_next_status) {
        whereClause.trs_next_status = trs_next_status;
      }
      if (trs_status) {
        whereClause.trs_status = trs_status;
      }
      if (trs_process_id) {
        whereClause.trs_process_id = trs_process_id;
      }
      if (trs_access_profile) {
        whereClause.trs_access_profile = trs_access_profile;
      }
      if (trs_org_grp_code) {
        whereClause.trs_org_grp_code = trs_org_grp_code;
      }
      if (trs_org_code) {
        whereClause.trs_org_code = trs_org_code;
      }
      if (trs_role_grp_code) {
        whereClause.trs_role_grp_code = trs_role_grp_code;
      }
      if (trs_role_code) {
        whereClause.trs_role_code = trs_role_code;
      }
      if (trs_ps_grp_code) {
        whereClause.trs_ps_grp_code = trs_ps_grp_code;
      }
      if (trs_ps_code) {
        whereClause.trs_ps_code = trs_ps_code;
      }
      if (trs_sub_org_grp_code) {
        whereClause.trs_sub_org_grp_code = trs_sub_org_grp_code;
      }
      if (trs_sub_org_code) {
        whereClause.trs_sub_org_code = trs_sub_org_code;
      }
      const res = await this.prismaService.claims_detail.findMany({ 
      where: whereClause,
      select: {claim_detail_id:true,expense_category:true,expense_description:true,expense_date:true,expense_amount:true,name:true,attachment:true,claim_category:true,          claim_id :true,    
        trs_created_date:true,
        trs_created_by:true,
        trs_modified_date:true,
        trs_modified_by:true,
        trs_next_status:true,
        trs_status:true,
        trs_process_id:true,
        trs_access_profile:true,
        trs_org_grp_code:true,
        trs_org_code:true,
        trs_role_grp_code:true,
        trs_role_code:true,
        trs_ps_grp_code:true,
        trs_ps_code:true,
        trs_sub_org_code:true,
        trs_sub_org_grp_code:true
      }
      });
      let decryptedRes: any = [];
      for (const indiviual of res) {
        const decryptedData = await this.decryptData(indiviual, 'claims_detail');
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
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
    }
    }
    
  async create(createclaims_detailDto: Prisma.claims_detailCreateInput,token:string) {
    try{

      const dataSchema:any =  v.object({
            expense_category :  v.optional(v.string()), 
            expense_description :  v.optional(v.string()), 
            expense_date :v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )  , 
            expense_amount :  v.optional(v.number()), 
            name :  v.optional(v.string()), 
            attachment :  v.optional(v.string()), 
            claim_category :  v.optional(v.string()), 
        });
        let validate : any = v.safeParse(dataSchema,createclaims_detailDto);
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
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
            token
          );
        }
        
      const res = await this.prismaService.claims_detail.create({ 
      data: await this.encryptData(createclaims_detailDto,'claims_detail','create'),
      select:{claim_detail_id:true,expense_category:true,expense_description:true,expense_date:true,expense_amount:true,name:true,attachment:true,claim_category:true,claim_id :true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_next_status:true,trs_status:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true}
          
    })
    return await this.decryptData(res, 'claims_detail');
  } catch (error) {
    const errMsg = parsePrismaCreateError(error);
    const errorMessage = 'Create Error';
    await this.commonService.errorLog(
      "Technical",
      'AK',
      'Fatal',
      "TG022",
      errMsg,
      "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
      token
    );
    throw new InternalServerErrorException(errMsg);
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
    createclaims_detailDto: Prisma.claims_detailCreateInput,
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
          
          const result = await this.prismaService.$queryRaw<any[]>`
            SELECT ct006_torus202610.approve_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `;
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'claims_detail creation approved and applied successfully',
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
          const result = await this.prismaService.$queryRaw<any[]>`
            SELECT ct006_torus202610.reject_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `;
  
          const success = result[0]?.success;
  
          if (success) {
            return {
              success: true,
              message: 'claims_detail creation rejected',
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
            expense_category :  v.optional(v.string()), 
            expense_description :  v.optional(v.string()), 
            expense_date :v.pipe(
                  v.string(),
                  v.regex(
                    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
                    'The date-time is badly formatted.'
                  )  // Full ISO 8601 date-time format
                )  , 
            expense_amount :  v.optional(v.number()), 
            name :  v.optional(v.string()), 
            attachment :  v.optional(v.string()), 
            claim_category :  v.optional(v.string()), 
        });
        let validate : any = v.safeParse(dataSchema,createclaims_detailDto);
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
            "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
            token
          );
          throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }
      
      // Encrypt data if needed
      const encryptedData = await this.encryptData(createclaims_detailDto, 'claims_detail', 'create');
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
        
        const result = await this.prismaService.$queryRaw<any[]>`
          SELECT ct006_torus202610.request_change(
            p_table_name     := 'claims_detail',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'claim_detail_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct003_a001'
          ) AS approval_id
        `;

        const approvalId = result[0]?.approval_id;

        return {
          success: true,
          message: 'claims_detail creation request submitted for approval',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
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

  async update(claim_detail_id:number, updateclaims_detailDto: Prisma.claims_detailUpdateInput,token:string) {   
    try{

      const dataSchema:any =  v.object({
          expense_category :  v.optional(v.string()), 
          expense_description :  v.optional(v.string()), 
          expense_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          expense_amount :  v.optional(v.number()), 
          name :  v.optional(v.string()), 
          attachment :  v.optional(v.string()), 
          claim_category :  v.optional(v.string()), 
      });
      let validate : any = v.safeParse(dataSchema,updateclaims_detailDto);
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
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
          token
        );
      }
      const res = await this.prismaService.claims_detail.update({
      where: {claim_detail_id},
      data: await this.encryptData(updateclaims_detailDto,'claims_detail','update'),
      select: {claim_detail_id:true,expense_category:true,expense_description:true,expense_date:true,expense_amount:true,name:true,attachment:true,claim_category:true,claim_id :true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_next_status:true,trs_status:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true}
    });
    return await this.decryptData(res, 'claims_detail');
    } catch (error) {
        const errorMessage = 'update Error';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG023",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
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
claim_detail_id:number,
    updateclaims_detailDto: Prisma.claims_detailUpdateInput,
    userInfo: { role: string; username: string; remarks?: string,approvalStatus?:string },
    token:string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const updateMaster_id =claim_detail_id;

      // =====================================================
      // CHECKER ROLE: Approve pending UPDATE request
      // =====================================================
      if (role === 'CHECKER') {

        if (!updateMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        // const result = await this.prismaService.$queryRaw<any[]>`
        //   SELECT * FROM approve_change_by_record(
        //     'customers',
        //     ${approvalId},
        //     ${userInfo.username},
        //     ${userInfo.remarks || null}
        //   ) AS success
        // `;
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.prismaService.$queryRaw<any[]>`
          SELECT * FROM ct006_torus202610.approve_change_by_record(
              p_table_name      := 'claims_detail',
              p_record_id       := ${updateMaster_id.toString()},
              p_checker_id      := ${userInfo.username},
              p_checker_remarks := ${userInfo.remarks || null}
          );
        `;

        const success = result[0]?.success;
        const approvalId = result[0]?.approval_id;

        if (success) {
          return {
            success: true,
            message: 'claims_detail update approved and applied successfully',
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
          const result = await this.prismaService.$queryRaw<any[]>`
            SELECT * FROM ct006_torus202610.reject_change_by_record(
                p_table_name      := 'claims_detail',
                p_record_id       := ${updateMaster_id.toString()},
                p_checker_id      := ${userInfo.username},
                p_checker_remarks := ${userInfo.remarks || null}
            );
          `;

          const success = result[0]?.success;
          const approvalId = result[0]?.approval_id;

          if (success) {
            return {
              success: true,
              message: 'claims_detail update rejected',
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
          expense_category :  v.optional(v.string()), 
          expense_description :  v.optional(v.string()), 
          expense_date :  v.optional(v.pipe(
            v.string(),
            v.regex(
              /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))$/,
              'The date-time is badly formatted.'
            )  // Full ISO 8601 date-time format
          )), 
          expense_amount :  v.optional(v.number()), 
          name :  v.optional(v.string()), 
          attachment :  v.optional(v.string()), 
          claim_category :  v.optional(v.string()), 
      });
      let validate : any = v.safeParse(dataSchema,updateclaims_detailDto);
      if (!validate.success) {
        const errorMessage = validate.issues[0].message;
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG025",
          errorMessage,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
          token
        );
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }

      // Verify record exists
      const existingRecord = await this.prismaService.claims_detail.findUnique({
        where: {claim_detail_id}
      });

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Encrypt data if needed
      const encryptedData = await this.encryptData(updateclaims_detailDto, 'claims_detail', 'update');

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
      const result = await this.prismaService.$queryRaw<any[]>`
        SELECT ct006_torus202610.request_change(
          p_table_name     := 'claims_detail',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'claim_detail_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct003_a001'
        ) AS approval_id
      `;

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'claims_detail update request submitted for approval',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
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

  async remove(claim_detail_id:number,token : string) {
    try{
      const res = await this.prismaService.claims_detail.delete({
      where: {claim_detail_id },
      select: {claim_detail_id:true,expense_category:true,expense_description:true,expense_date:true,expense_amount:true,name:true,attachment:true,claim_category:true,claim_id :true,trs_created_date:true,trs_created_by:true,trs_modified_date:true,trs_modified_by:true,trs_next_status:true,trs_status:true,trs_process_id:true,trs_access_profile:true,trs_org_grp_code:true,trs_org_code:true,trs_role_grp_code:true,trs_role_code:true,trs_ps_grp_code:true,trs_ps_code:true,trs_sub_org_code:true,trs_sub_org_grp_code:true}
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
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
claim_detail_id:number,
    userInfo: { role: string; username: string; remarks?: string; approvalStatus?:string },
    token: string
  ) {
    try {
      const role = userInfo.role?.toUpperCase();
      const deleteMaster_id =claim_detail_id;

      // =====================================================
      // CHECKER ROLE: Approve pending DELETE request
      // =====================================================
      if (role === 'CHECKER') {

        if (!deleteMaster_id) {
          throw new HttpException('id is required for CHECKER role', HttpStatus.BAD_REQUEST);
        }

        // Call approve_change(approval_id, checker_id, checker_remarks)
        if (userInfo.approvalStatus === 'APPROVED') {
        const result = await this.prismaService.$queryRaw<any[]>`
          SELECT * FROM ct006_torus202610.approve_change_by_record(
              p_table_name      := 'claims_detail',
              p_record_id       := ${deleteMaster_id.toString()},
              p_checker_id      := ${userInfo.username},
              p_checker_remarks := ${userInfo.remarks || null}
          );
        `;

        const success = result[0]?.success;
        const approvalId = result[0]?.approval_id;

        if (success) {
          return {
            success: true,
            message: 'claims_detail deletion approved and applied successfully',
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
          const result = await this.prismaService.$queryRaw<any[]>`
            SELECT * FROM ct006_torus202610.reject_change_by_record(
                p_table_name      := 'claims_detail',
                p_record_id       := ${deleteMaster_id.toString()},
                p_checker_id      := ${userInfo.username},
                p_checker_remarks := ${userInfo.remarks || null}
            );
          `;

          const success = result[0]?.success;
          const approvalId = result[0]?.approval_id;

          if (success) {
            return {
              success: true,
              message: 'claims_detail deletion rejected',
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
      const existingRecord = await this.prismaService.claims_detail.findUnique({
        where: {claim_detail_id  }
      });

      if (!existingRecord) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
      }

      // Call request_change() for DELETE
      // For DELETE: p_record_id is the ID, p_changes is empty object
      const result = await this.prismaService.$queryRaw<any[]>`
        SELECT ct006_torus202610.request_change(
          p_table_name     := 'claims_detail',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'claim_detail_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct003_a001'
        ) AS approval_id
      `;

      const approvalId = result[0]?.approval_id;

      return {
        success: true,
        message: 'claims_detail deletion request submitted for approval',
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
        "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
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
      const res = await this.prismaService.claims_detail.findFirst({ 
        orderBy: { trs_created_date: 'asc' },
      });
      return  await this.decryptData(res, 'claims_detail');
    } catch (error) {
      const errorMessage = 'Error in findFirst';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }
  async findLast(token : string) {
    try{
      const res = await this.prismaService.claims_detail.findFirst({ 
        orderBy: { trs_created_date: 'desc' },
      });
      return  await this.decryptData(res, 'claims_detail');
    } catch (error) {
      const errorMessage = 'Error in findLast';
        await this.commonService.errorLog(
          "Technical",
          'AK',
          'Fatal',
          "TG028",
          error,
          "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:AG001:AFGK:A001:AFK:reimfast_erd:AFVK:v1",
          token
        );
        throw new CustomException(errorMessage, error);
      }
  }

}
