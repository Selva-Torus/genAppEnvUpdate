

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { hrm_leave_policiesService } from './hrm_leave_policies.service';
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
import { hrm_leave_policiesEntity } from './entity/hrm_leave_policies.entity';
//import { CreateHrmLeavePoliciesDto } from '../prisma/dto/create-hrmLeavePolicies.dto';
//import { UpdateHrmLeavePoliciesDto } from '../prisma/dto/update-hrmLeavePolicies.dto';
import { Createhrm_leave_policiesDto } from './dto/Createhrm_leave_policies.dto';
import { Updatehrm_leave_policiesDto } from './dto/Updatehrm_leave_policies.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('hrm_leave_policies')
@ApiTags('ERD API')
export class hrm_leave_policiesController {
  constructor(
    private readonly hrm_leave_policiesService: hrm_leave_policiesService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_leave_policiesEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the hrm_leave_policies table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.hrm_leave_policiesService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_leave_policiesEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the hrm_leave_policies table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.hrm_leave_policiesService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':policy_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'policy_id',type:Number})
  @ApiOkResponse({ type: hrm_leave_policiesEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the hrm_leave_policies table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('policy_id') policy_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
    const result = await this.hrm_leave_policiesService.findOne(+policy_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_leave_policiesEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_leave_policiesEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the hrm_leave_policies table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
    const result = await this.hrm_leave_policiesService.findAll(token,detokenize,detokenizeData,);
    return plainToInstance(hrm_leave_policiesEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('hrm_leave_policies'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createhrm_leave_policiesDto })
  @ApiCreatedResponse({ type: hrm_leave_policiesEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the hrm_leave_policies table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createhrm_leave_policiesDto: Prisma.hrm_leave_policiesCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
      const result = await this.hrm_leave_policiesService.createMaster(createhrm_leave_policiesDto, makerInfo, token);
      return result;
    }

    const result = this.hrm_leave_policiesService.create(createhrm_leave_policiesDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_leave_policiesEntity, result);
  }
 
  @Patch(':policy_id')
  @UsePipes(new PrismaModelValidationPipe('hrm_leave_policies', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'policy_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatehrm_leave_policiesDto })
  @ApiOkResponse({ type: hrm_leave_policiesEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the hrm_leave_policies table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('policy_id') policy_id:number,
    @Body() updatehrm_leave_policiesDto: Prisma.hrm_leave_policiesUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
      const result = await this.hrm_leave_policiesService.updateMaster(+policy_id,updatehrm_leave_policiesDto,makerInfo,token);
      return result;
    }

    const result = await this.hrm_leave_policiesService.update(+policy_id,updatehrm_leave_policiesDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_leave_policiesEntity, result);
  }
 
  @Delete(':policy_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'policy_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: hrm_leave_policiesEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the hrm_leave_policies table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('policy_id') policy_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
      const result = await this.hrm_leave_policiesService.deleteMaster(+policy_id,makerInfo,token);
      return result;
    }

    const result = await this.hrm_leave_policiesService.remove(+policy_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_leave_policiesEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_leave_policiesEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the hrm_leave_policies table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
    const result = await this.hrm_leave_policiesService.findFirst(token, detokenize,detokenizeData);
    return plainToInstance(hrm_leave_policiesEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_leave_policiesEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the hrm_leave_policies table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["policy_id"] = req.headers.policy_id || "";
      detokenizeData["policy_code"] = req.headers.policy_code || "";
      detokenizeData["policy_name"] = req.headers.policy_name || "";
      detokenizeData["leave_type"] = req.headers.leave_type || "";
      detokenizeData["days_per_year"] = req.headers.days_per_year || "";
      detokenizeData["carry_forward_days"] = req.headers.carry_forward_days || "";
      detokenizeData["applicable_to"] = req.headers.applicable_to || "";
      detokenizeData["gender_applicability"] = req.headers.gender_applicability || "";
      detokenizeData["accrual_frequency"] = req.headers.accrual_frequency || "";
      detokenizeData["max_consecutive_days"] = req.headers.max_consecutive_days || "";
      detokenizeData["approval_required"] = req.headers.approval_required || "";
      detokenizeData["encashment_allowed"] = req.headers.encashment_allowed || "";
      detokenizeData["carry_forward_expiry"] = req.headers.carry_forward_expiry || "";
      detokenizeData["applicable_locations"] = req.headers.applicable_locations || "";
      detokenizeData["policy_rules_json"] = req.headers.policy_rules_json || "";
      detokenizeData["accrual_rules_json"] = req.headers.accrual_rules_json || "";
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
    const result = await this.hrm_leave_policiesService.findLast(token, detokenize,detokenizeData);
    return plainToInstance(hrm_leave_policiesEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_leave_policiesEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.hrm_leave_policiesService.getLockById(key, value, token);
    return plainToInstance(hrm_leave_policiesEntity, result);
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
    const result = await this.hrm_leave_policiesService.releaseLockById(key, value, token);
    return result;
  }
}