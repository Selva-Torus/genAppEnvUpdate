

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { npss_sm_process_logService } from './npss_sm_process_log.service';
//import { Prisma } from '@prisma/client';
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
import { npss_sm_process_logEntity } from './entity/npss_sm_process_log.entity';
//import { CreateNpssSmProcessLogDto } from '../prisma/dto/create-npssSmProcessLog.dto';
//import { UpdateNpssSmProcessLogDto } from '../prisma/dto/update-npssSmProcessLog.dto';
import { Createnpss_sm_process_logDto } from './dto/Createnpss_sm_process_log.dto';
import { Updatenpss_sm_process_logDto } from './dto/Updatenpss_sm_process_log.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('npss_sm_process_log')
@ApiTags('ERD API')
export class npss_sm_process_logController {
  constructor(
    private readonly npss_sm_process_logService: npss_sm_process_logService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_sm_process_logEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the npss_sm_process_log table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.npss_sm_process_logService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_sm_process_logEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the npss_sm_process_log table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.npss_sm_process_logService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':npsssmpl_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'npsssmpl_id',type:Number})
  @ApiOkResponse({ type: npss_sm_process_logEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the npss_sm_process_log table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('npsssmpl_id') npsssmpl_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.npss_sm_process_logService.findOne(+npsssmpl_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_sm_process_logEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_sm_process_logEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the npss_sm_process_log table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
      detokenizeData["sortingcolumns"] = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
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
    const result = await this.npss_sm_process_logService.findAll(token,req.authContext,detokenize,detokenizeData,);
    return plainToInstance(npss_sm_process_logEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('npss_sm_process_log'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createnpss_sm_process_logDto })
  @ApiCreatedResponse({ type: npss_sm_process_logEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the npss_sm_process_log table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createnpss_sm_process_logDto: Createnpss_sm_process_logDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use createMaster
    if (mcRole && mcUsername) {
      // Maker-checker identity comes from the verified token, never from the
      // xCdcaUsername header — that header previously let any caller submit or
      // approve a change under someone else's name. Role still arrives by
      // header, so maker != checker must be enforced in
      // tam.approve_change_by_record, which already receives p_checker_id.
      const mcIdentity = req.authContext?.loginId;
      if (!mcIdentity) {
        throw new UnauthorizedException('Maker-checker action requires an authenticated user');
      }

      const makerInfo = { role: mcRole, username: mcIdentity, remarks: mcRemarks, approvalStatus: mcApprovalStatus,approvalId:mcApprovalID,detokenize:detokenize };
      const result = await this.npss_sm_process_logService.createMaster(createnpss_sm_process_logDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.npss_sm_process_logService.create(createnpss_sm_process_logDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_sm_process_logEntity, result);
  }
 
  @Patch(':npsssmpl_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('npss_sm_process_log', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'npsssmpl_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatenpss_sm_process_logDto })
  @ApiOkResponse({ type: npss_sm_process_logEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the npss_sm_process_log table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('npsssmpl_id') npsssmpl_id:number,
    @Body() updatenpss_sm_process_logDto: Updatenpss_sm_process_logDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use updateMaster
    if (mcRole && mcUsername) {
      // Maker-checker identity comes from the verified token, never from the
      // xCdcaUsername header — that header previously let any caller submit or
      // approve a change under someone else's name. Role still arrives by
      // header, so maker != checker must be enforced in
      // tam.approve_change_by_record, which already receives p_checker_id.
      const mcIdentity = req.authContext?.loginId;
      if (!mcIdentity) {
        throw new UnauthorizedException('Maker-checker action requires an authenticated user');
      }

      const makerInfo = { role: mcRole, username: mcIdentity, remarks: mcRemarks,approvalStatus: mcApprovalStatus,detokenize: detokenize };
      const result = await this.npss_sm_process_logService.updateMaster(+npsssmpl_id,updatenpss_sm_process_logDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.npss_sm_process_logService.update(+npsssmpl_id,updatenpss_sm_process_logDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_sm_process_logEntity, result);
  }
 
  @Delete(':npsssmpl_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'npsssmpl_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: npss_sm_process_logEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the npss_sm_process_log table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('npsssmpl_id') npsssmpl_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);

    // Flag-driven routing: if maker-checker headers are present, use deleteMaster
    if (mcRole && mcUsername) {
      // Maker-checker identity comes from the verified token, never from the
      // xCdcaUsername header — that header previously let any caller submit or
      // approve a change under someone else's name. Role still arrives by
      // header, so maker != checker must be enforced in
      // tam.approve_change_by_record, which already receives p_checker_id.
      const mcIdentity = req.authContext?.loginId;
      if (!mcIdentity) {
        throw new UnauthorizedException('Maker-checker action requires an authenticated user');
      }

      const makerInfo = { role: mcRole, username: mcIdentity, remarks: mcRemarks,approvalStatus: mcApprovalStatus,detokenize: detokenize };
      const result = await this.npss_sm_process_logService.deleteMaster(+npsssmpl_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.npss_sm_process_logService.remove(+npsssmpl_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_sm_process_logEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: npss_sm_process_logEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the npss_sm_process_log table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.npss_sm_process_logService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_sm_process_logEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: npss_sm_process_logEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the npss_sm_process_log table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["npsssmpl_id"] = req.headers.npsssmpl_id || "";
      detokenizeData["bankuserid"] = req.headers.bankuserid || "";
      detokenizeData["process_name"] = req.headers.process_name || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["result_code"] = req.headers.result_code || "";
      detokenizeData["result"] = req.headers.result || "";
      detokenizeData["result_message"] = req.headers.result_message || "";
      detokenizeData["result_x_request_id"] = req.headers.result_x_request_id || "";
      detokenizeData["process_ref_no"] = req.headers.process_ref_no || "";
      detokenizeData["request_data_json"] = req.headers.request_data_json || "";
      detokenizeData["response_data_json"] = req.headers.response_data_json || "";
      detokenizeData["channel_id"] = req.headers.channel_id || "";
      detokenizeData["channel_refno"] = req.headers.channel_refno || "";
      detokenizeData["channel_userid"] = req.headers.channel_userid || "";
      detokenizeData["channel_product"] = req.headers.channel_product || "";
      detokenizeData["channel_sub_product"] = req.headers.channel_sub_product || "";
      detokenizeData["channel_tran_code"] = req.headers.channel_tran_code || "";
      detokenizeData["reject_reason_code"] = req.headers.reject_reason_code || "";
      detokenizeData["reject_reason"] = req.headers.reject_reason || "";
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
      detokenizeData["trs_prev_process_code"] = req.headers.trs_prev_process_code || "";
      detokenizeData["trs_prev_status"] = req.headers.trs_prev_status || "";
      detokenizeData["trs_prev_process_status"] = req.headers.trs_prev_process_status || "";
      detokenizeData["trs_process_code"] = req.headers.trs_process_code || "";
      detokenizeData["trs_status"] = req.headers.trs_status || "";
      detokenizeData["trs_process_status"] = req.headers.trs_process_status || "";
      detokenizeData["trs_next_process_code"] = req.headers.trs_next_process_code || "";
      detokenizeData["trs_next_status"] = req.headers.trs_next_status || "";
      detokenizeData["trs_next_process_status"] = req.headers.trs_next_process_status || "";
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    const result = await this.npss_sm_process_logService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_sm_process_logEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_sm_process_logEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.npss_sm_process_logService.getLockById(key, value, token);
    return plainToInstance(npss_sm_process_logEntity, result);
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
    const result = await this.npss_sm_process_logService.releaseLockById(key, value, token);
    return result;
  }
}