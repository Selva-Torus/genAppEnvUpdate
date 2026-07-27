

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { hrm_job_gradesService } from './hrm_job_grades.service';
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
import { hrm_job_gradesEntity } from './entity/hrm_job_grades.entity';
//import { CreateHrmJobGradesDto } from '../prisma/dto/create-hrmJobGrades.dto';
//import { UpdateHrmJobGradesDto } from '../prisma/dto/update-hrmJobGrades.dto';
import { Createhrm_job_gradesDto } from './dto/Createhrm_job_grades.dto';
import { Updatehrm_job_gradesDto } from './dto/Updatehrm_job_grades.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('hrm_job_grades')
@ApiTags('ERD API')
export class hrm_job_gradesController {
  constructor(
    private readonly hrm_job_gradesService: hrm_job_gradesService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_job_gradesEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the hrm_job_grades table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.hrm_job_gradesService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_job_gradesEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the hrm_job_grades table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.hrm_job_gradesService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':grade_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'grade_id',type:Number})
  @ApiOkResponse({ type: hrm_job_gradesEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the hrm_job_grades table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('grade_id') grade_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
    const result = await this.hrm_job_gradesService.findOne(+grade_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_job_gradesEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_job_gradesEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the hrm_job_grades table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
    const result = await this.hrm_job_gradesService.findAll(token,detokenize,detokenizeData,);
    return plainToInstance(hrm_job_gradesEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('hrm_job_grades'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createhrm_job_gradesDto })
  @ApiCreatedResponse({ type: hrm_job_gradesEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the hrm_job_grades table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createhrm_job_gradesDto: Prisma.hrm_job_gradesCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
      const result = await this.hrm_job_gradesService.createMaster(createhrm_job_gradesDto, makerInfo, token);
      return result;
    }

    const result = this.hrm_job_gradesService.create(createhrm_job_gradesDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_job_gradesEntity, result);
  }
 
  @Patch(':grade_id')
  @UsePipes(new PrismaModelValidationPipe('hrm_job_grades', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'grade_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatehrm_job_gradesDto })
  @ApiOkResponse({ type: hrm_job_gradesEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the hrm_job_grades table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('grade_id') grade_id:number,
    @Body() updatehrm_job_gradesDto: Prisma.hrm_job_gradesUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
      const result = await this.hrm_job_gradesService.updateMaster(+grade_id,updatehrm_job_gradesDto,makerInfo,token);
      return result;
    }

    const result = await this.hrm_job_gradesService.update(+grade_id,updatehrm_job_gradesDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_job_gradesEntity, result);
  }
 
  @Delete(':grade_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'grade_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: hrm_job_gradesEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the hrm_job_grades table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('grade_id') grade_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
      const result = await this.hrm_job_gradesService.deleteMaster(+grade_id,makerInfo,token);
      return result;
    }

    const result = await this.hrm_job_gradesService.remove(+grade_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_job_gradesEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_job_gradesEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the hrm_job_grades table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
    const result = await this.hrm_job_gradesService.findFirst(token, detokenize,detokenizeData);
    return plainToInstance(hrm_job_gradesEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_job_gradesEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the hrm_job_grades table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["grade_id"] = req.headers.grade_id || "";
      detokenizeData["grade_code"] = req.headers.grade_code || "";
      detokenizeData["grade_name"] = req.headers.grade_name || "";
      detokenizeData["grade_description"] = req.headers.grade_description || "";
      detokenizeData["grade_level"] = req.headers.grade_level || "";
      detokenizeData["min_salary"] = req.headers.min_salary || "";
      detokenizeData["max_salary"] = req.headers.max_salary || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["bonus_percentage"] = req.headers.bonus_percentage || "";
      detokenizeData["promotion_eligible"] = req.headers.promotion_eligible || "";
      detokenizeData["overtime_eligible"] = req.headers.overtime_eligible || "";
      detokenizeData["notice_period_days"] = req.headers.notice_period_days || "";
      detokenizeData["probation_period_days"] = req.headers.probation_period_days || "";
      detokenizeData["appraisal_cycle"] = req.headers.appraisal_cycle || "";
      detokenizeData["grade_metadata"] = req.headers.grade_metadata || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
      detokenizeData["secure_data"] = req.headers.secure_data || "";
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
    const result = await this.hrm_job_gradesService.findLast(token, detokenize,detokenizeData);
    return plainToInstance(hrm_job_gradesEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_job_gradesEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.hrm_job_gradesService.getLockById(key, value, token);
    return plainToInstance(hrm_job_gradesEntity, result);
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
    const result = await this.hrm_job_gradesService.releaseLockById(key, value, token);
    return result;
  }
}