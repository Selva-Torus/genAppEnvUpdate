

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes} from '@nestjs/common';
import { hrm_employee_ndaService } from './hrm_employee_nda.service';
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
import { hrm_employee_ndaEntity } from './entity/hrm_employee_nda.entity';
//import { CreateHrmEmployeeNdaDto } from '../prisma/dto/create-hrmEmployeeNda.dto';
//import { UpdateHrmEmployeeNdaDto } from '../prisma/dto/update-hrmEmployeeNda.dto';
import { Createhrm_employee_ndaDto } from './dto/Createhrm_employee_nda.dto';
import { Updatehrm_employee_ndaDto } from './dto/Updatehrm_employee_nda.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('hrm_employee_nda')
@ApiTags('ERD API')
export class hrm_employee_ndaController {
  constructor(
    private readonly hrm_employee_ndaService: hrm_employee_ndaService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employee_ndaEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the hrm_employee_nda table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.hrm_employee_ndaService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employee_ndaEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the hrm_employee_nda table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    return this.hrm_employee_ndaService.findAllmethod(query, +limit,selectColumns,token);
  }

  @Get(':nda_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'nda_id',type:Number})
  @ApiOkResponse({ type: hrm_employee_ndaEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the hrm_employee_nda table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('nda_id') nda_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
    const result = await this.hrm_employee_ndaService.findOne(+nda_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employee_ndaEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employee_ndaEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the hrm_employee_nda table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
    const result = await this.hrm_employee_ndaService.findAll(token,detokenize,detokenizeData,);
    return plainToInstance(hrm_employee_ndaEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('hrm_employee_nda'))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createhrm_employee_ndaDto })
  @ApiCreatedResponse({ type: hrm_employee_ndaEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the hrm_employee_nda table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createhrm_employee_ndaDto: Prisma.hrm_employee_ndaCreateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
      const result = await this.hrm_employee_ndaService.createMaster(createhrm_employee_ndaDto, makerInfo, token);
      return result;
    }

    const result = this.hrm_employee_ndaService.create(createhrm_employee_ndaDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employee_ndaEntity, result);
  }
 
  @Patch(':nda_id')
  @UsePipes(new PrismaModelValidationPipe('hrm_employee_nda', true))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'nda_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatehrm_employee_ndaDto })
  @ApiOkResponse({ type: hrm_employee_ndaEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the hrm_employee_nda table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('nda_id') nda_id:number,
    @Body() updatehrm_employee_ndaDto: Prisma.hrm_employee_ndaUpdateInput,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
      const result = await this.hrm_employee_ndaService.updateMaster(+nda_id,updatehrm_employee_ndaDto,makerInfo,token);
      return result;
    }

    const result = await this.hrm_employee_ndaService.update(+nda_id,updatehrm_employee_ndaDto,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employee_ndaEntity, result);
  }
 
  @Delete(':nda_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'nda_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: hrm_employee_ndaEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the hrm_employee_nda table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('nda_id') nda_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
      const result = await this.hrm_employee_ndaService.deleteMaster(+nda_id,makerInfo,token);
      return result;
    }

    const result = await this.hrm_employee_ndaService.remove(+nda_id,token,detokenize,detokenizeData);
    return plainToInstance(hrm_employee_ndaEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_employee_ndaEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the hrm_employee_nda table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
    const result = await this.hrm_employee_ndaService.findFirst(token, detokenize,detokenizeData);
    return plainToInstance(hrm_employee_ndaEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: hrm_employee_ndaEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the hrm_employee_nda table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["nda_id"] = req.headers.nda_id || "";
      detokenizeData["nda_number"] = req.headers.nda_number || "";
      detokenizeData["nda_type"] = req.headers.nda_type || "";
      detokenizeData["signed_date"] = req.headers.signed_date || "";
      detokenizeData["expiry_date"] = req.headers.expiry_date || "";
      detokenizeData["renewal_required"] = req.headers.renewal_required || "";
      detokenizeData["signed_file_path"] = req.headers.signed_file_path || "";
      detokenizeData["additional_details"] = req.headers.additional_details || "";
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
    const result = await this.hrm_employee_ndaService.findLast(token, detokenize,detokenizeData);
    return plainToInstance(hrm_employee_ndaEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: hrm_employee_ndaEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.hrm_employee_ndaService.getLockById(key, value, token);
    return plainToInstance(hrm_employee_ndaEntity, result);
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
    const result = await this.hrm_employee_ndaService.releaseLockById(key, value, token);
    return result;
  }
}