

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { hrm_employeesService } from './hrm_employees.service';
import { Prisma } from '@prisma/client';
import { ApiOkResponse, ApiTags,ApiOperation,ApiBody,
  ApiQuery,ApiParam,
  ApiBadRequestResponse,ApiUnauthorizedResponse,
  ApiForbiddenResponse,ApiNotAcceptableResponse,
  ApiConflictResponse,ApiNotFoundResponse,
  ApiMethodNotAllowedResponse,
  ApiRequestTimeoutResponse,
  ApiGoneResponse,
  ApiUnsupportedMediaTypeResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiNotImplementedResponse,
  ApiBadGatewayResponse,
  ApiServiceUnavailableResponse,
  ApiGatewayTimeoutResponse,
  ApiBearerAuth ,
  ApiCreatedResponse,
  ApiHeader
} from '@nestjs/swagger';
import { hrm_employeesEntity } from './entity/hrm_employees.entity';
//import { CreateHrmEmployeesDto } from '../prisma/dto/create-hrmEmployees.dto';
//import { UpdateHrmEmployeesDto } from '../prisma/dto/update-hrmEmployees.dto';
import { Createhrm_employeesDto } from './dto/Createhrm_employees.dto';
import { Updatehrm_employeesDto } from './dto/Updatehrm_employees.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('hrm_employees')
@ApiTags('ERD API')
export class hrm_employeesController {
  constructor(
    private readonly hrm_employeesService: hrm_employeesService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employeesEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the hrm_employees table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.hrm_employeesService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employeesEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the hrm_employees table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.hrm_employeesService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':employee_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'employee_id',type:Number})
  @ApiOkResponse({ type: hrm_employeesEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the hrm_employees table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('employee_id') employee_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.hrm_employeesService.findOne(+employee_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employeesEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employeesEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the hrm_employees table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    let presentQueryKeys:any=[
    ]
    let comingQueryKeys:any=Object.keys(query)||[]
    let isComingQuerysAreValid=true;
    if(comingQueryKeys.length==0)
      {
        isComingQuerysAreValid = true;
      }
  
      // If arrays have different lengths, they cannot be equal
      if (comingQueryKeys.length > presentQueryKeys.length) {
        isComingQuerysAreValid= false;
      }
      // Compare each element after sorting
      for (let i = 0; i < comingQueryKeys.length; i++) {
        if (!presentQueryKeys.includes(comingQueryKeys[i])) {
          isComingQuerysAreValid=false;
        }
      }
    if (req.originalUrl.includes('?') && req.originalUrl.split('?')[1].includes('/') || isComingQuerysAreValid==false) {
      throw new NotFoundException('Invalid query parameter structure.');
    }
    const result = await this.hrm_employeesService.findAll(token,detokenize,detokenizeData,);
    return plainToInstance(hrm_employeesEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('hrm_employees'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createhrm_employeesDto })
  @ApiCreatedResponse({ type: hrm_employeesEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the hrm_employees table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createhrm_employeesDto: Prisma.hrm_employeesCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID,detokenize:detokenize };
      const result = await this.hrm_employeesService.createMaster(createhrm_employeesDto, makerInfo, token);
      return result;
    }

    const result = this.hrm_employeesService.create(createhrm_employeesDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employeesEntity, result);
  }
 
  @Patch(':employee_id')
  @UsePipes(new PrismaModelValidationPipe('hrm_employees', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'employee_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatehrm_employeesDto })
  @ApiOkResponse({ type: hrm_employeesEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the hrm_employees table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('employee_id') employee_id:number,
    @Body() updatehrm_employeesDto: Prisma.hrm_employeesUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus,detokenize: detokenize };
      const result = await this.hrm_employeesService.updateMaster(+employee_id,updatehrm_employeesDto,makerInfo,token);
      return result;
    }

    const result = await this.hrm_employeesService.update(+employee_id,updatehrm_employeesDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employeesEntity, result);
  }
 
  @Delete(':employee_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'employee_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: hrm_employeesEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the hrm_employees table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('employee_id') employee_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks,approvalStatus: mcApprovalStatus,detokenize: detokenize };
      const result = await this.hrm_employeesService.deleteMaster(+employee_id,makerInfo,token);
      return result;
    }

    const result = await this.hrm_employeesService.remove(+employee_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employeesEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_employeesEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the hrm_employees table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.hrm_employeesService.findFirst(token, detokenize,detokenizeData);
    return plainToInstance(hrm_employeesEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_employeesEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the hrm_employees table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["employee_id"] = req.headers.employee_id || "";
      detokenizeData["employee_code"] = req.headers.employee_code || "";
      detokenizeData["emp_number"] = req.headers.emp_number || "";
      detokenizeData["first_name"] = req.headers.first_name || "";
      detokenizeData["middle_name"] = req.headers.middle_name || "";
      detokenizeData["last_name"] = req.headers.last_name || "";
      detokenizeData["full_name"] = req.headers.full_name || "";
      detokenizeData["preferred_name"] = req.headers.preferred_name || "";
      detokenizeData["gender"] = req.headers.gender || "";
      detokenizeData["date_of_birth"] = req.headers.date_of_birth || "";
      detokenizeData["marital_status"] = req.headers.marital_status || "";
      detokenizeData["personal_email"] = req.headers.personal_email || "";
      detokenizeData["work_email"] = req.headers.work_email || "";
      detokenizeData["mobile"] = req.headers.mobile || "";
      detokenizeData["alternate_mobile"] = req.headers.alternate_mobile || "";
      detokenizeData["address_line1"] = req.headers.address_line1 || "";
      detokenizeData["address_line2"] = req.headers.address_line2 || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["postal_code"] = req.headers.postal_code || "";
      detokenizeData["nationality"] = req.headers.nationality || "";
      detokenizeData["national_id"] = req.headers.national_id || "";
      detokenizeData["passport_number"] = req.headers.passport_number || "";
      detokenizeData["blood_group"] = req.headers.blood_group || "";
      detokenizeData["employment_type"] = req.headers.employment_type || "";
      detokenizeData["employee_status"] = req.headers.employee_status || "";
      detokenizeData["hire_date"] = req.headers.hire_date || "";
      detokenizeData["confirmation_date"] = req.headers.confirmation_date || "";
      detokenizeData["probation_end"] = req.headers.probation_end || "";
      detokenizeData["resignation_date"] = req.headers.resignation_date || "";
      detokenizeData["termination_date"] = req.headers.termination_date || "";
      detokenizeData["exit_reason"] = req.headers.exit_reason || "";
      detokenizeData["work_mode"] = req.headers.work_mode || "";
      detokenizeData["timezone"] = req.headers.timezone || "";
      detokenizeData["reporting_manager_id"] = req.headers.reporting_manager_id || "";
      detokenizeData["hr_manager_id"] = req.headers.hr_manager_id || "";
      detokenizeData["current_salary"] = req.headers.current_salary || "";
      detokenizeData["annual_ctc"] = req.headers.annual_ctc || "";
      detokenizeData["salary_currency"] = req.headers.salary_currency || "";
      detokenizeData["bank_name"] = req.headers.bank_name || "";
      detokenizeData["bank_account"] = req.headers.bank_account || "";
      detokenizeData["bank_ifsc"] = req.headers.bank_ifsc || "";
      detokenizeData["emergency_contact_name"] = req.headers.emergency_contact_name || "";
      detokenizeData["emergency_contact_phone"] = req.headers.emergency_contact_phone || "";
      detokenizeData["emergency_contact_relation"] = req.headers.emergency_contact_relation || "";
      detokenizeData["biometric_id"] = req.headers.biometric_id || "";
      detokenizeData["profile_photo_url"] = req.headers.profile_photo_url || "";
      detokenizeData["linkedin_profile"] = req.headers.linkedin_profile || "";
      detokenizeData["skills_json"] = req.headers.skills_json || "";
      detokenizeData["education_history_json"] = req.headers.education_history_json || "";
      detokenizeData["certifications_json"] = req.headers.certifications_json || "";
      detokenizeData["family_details_json"] = req.headers.family_details_json || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["custom_attributes_json"] = req.headers.custom_attributes_json || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
      detokenizeData["deleted_at"] = req.headers.deleted_at || "";
      detokenizeData["doc_url"] = req.headers.doc_url || "";
      detokenizeData["trs_created_date"] = req.headers.trs_created_date || "";
      detokenizeData["trs_created_by"] = req.headers.trs_created_by || "";
      detokenizeData["trs_modified_date"] = req.headers.trs_modified_date || "";
      detokenizeData["trs_modified_by"] = req.headers.trs_modified_by || "";
      detokenizeData["trs_process_id"] = req.headers.trs_process_id || "";
      detokenizeData["trs_access_profile"] = req.headers.trs_access_profile || "";
      detokenizeData["trs_org_grp_code"] = req.headers.trs_org_grp_code || "";
      detokenizeData["trs_org_code"] = req.headers.trs_org_code || "";
      detokenizeData["trs_role_grp_code"] = req.headers.trs_role_grp_code || "";
      detokenizeData["trs_role_code"] = req.headers.trs_role_code || "";
      detokenizeData["trs_ps_grp_code"] = req.headers.trs_ps_grp_code || "";
      detokenizeData["trs_ps_code"] = req.headers.trs_ps_code || "";
      detokenizeData["trs_sub_org_grp_code"] = req.headers.trs_sub_org_grp_code || "";
      detokenizeData["trs_sub_org_code"] = req.headers.trs_sub_org_code || "";
      detokenizeData["trs_locked_by"] = req.headers.trs_locked_by || "";
      detokenizeData["trs_locked_time"] = req.headers.trs_locked_time || "";
      detokenizeData["trs_tenant_id"] = req.headers.trs_tenant_id || "";
      detokenizeData["trs_app_code"] = req.headers.trs_app_code || "";
      detokenizeData["trs_product_code"] = req.headers.trs_product_code || "";
      detokenizeData["trs_event_process_status"] = req.headers.trs_event_process_status || "";
      detokenizeData["trs_event_status"] = req.headers.trs_event_status || "";
      detokenizeData["trs_token_id"] = req.headers.trs_token_id || "";
      detokenizeData["trs_version"] = req.headers.trs_version || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.hrm_employeesService.findLast(token, detokenize,detokenizeData);
    return plainToInstance(hrm_employeesEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employeesEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.hrm_employeesService.getLockById(key, value, token);
    return plainToInstance(hrm_employeesEntity, result);
  }

  @Post('/unlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: Object })
  @ApiOperation({
    summary: 'Unlock a record by id',
    description: 'Clear trs_locked_by and trs_locked_time for a record and remove from tam_transaction_locks',
  })
  async releaseLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.hrm_employeesService.releaseLockById(key, value, token);
    return result;
  }
}