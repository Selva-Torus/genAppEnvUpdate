
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { agent_sessionService } from './agent_session.service';
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
import { agent_sessionEntity } from './entity/agent_session.entity';
//import { CreateAgentSessionDto } from '../prisma/dto/create-agentSession.dto';
//import { UpdateAgentSessionDto } from '../prisma/dto/update-agentSession.dto';
import { Createagent_sessionDto } from './dto/Createagent_session.dto';
import { Updateagent_sessionDto } from './dto/Updateagent_session.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('agent_session')
@ApiTags('ERD API')
export class agent_sessionController {
  constructor(
    private readonly agent_sessionService: agent_sessionService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_sessionEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the agent_session table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.agent_sessionService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the agent_session table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.agent_sessionService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':session_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'session_id',type:Number})
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the agent_session table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('session_id') session_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
    const result = await this.agent_sessionService.findOne(+session_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the agent_session table',
  })
  @ApiQuery({ name: 'session_id', required: false})
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query('session_id') session_id?:string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
      detokenizeData["sortingcolumns"] = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    Object.keys(detokenizeData).forEach(key => {
      if (detokenizeData[key] === "") {
        delete detokenizeData[key];
      }
    });
    //await this.ufservice.introspectToken(authHeader,"",token);
    let presentQueryKeys:any=[
      'session_id',
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
    const result = await this.agent_sessionService.findAll(token,req.authContext,detokenize,detokenizeData,+session_id);
    return plainToInstance(agent_sessionEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('agent_session'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createagent_sessionDto })
  @ApiCreatedResponse({ type: agent_sessionEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the agent_session table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createagent_sessionDto: Createagent_sessionDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
      const result = await this.agent_sessionService.createMaster(createagent_sessionDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.agent_sessionService.create(createagent_sessionDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }
 
  @Patch(':session_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('agent_session', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'session_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateagent_sessionDto })
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the agent_session table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('session_id') session_id:number,
    @Body() updateagent_sessionDto: Updateagent_sessionDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
      const result = await this.agent_sessionService.updateMaster(+session_id,updateagent_sessionDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.agent_sessionService.update(+session_id,updateagent_sessionDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }
 
  @Delete(':session_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'session_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the agent_session table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('session_id') session_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
      const result = await this.agent_sessionService.deleteMaster(+session_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.agent_sessionService.remove(+session_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: agent_sessionEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the agent_session table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
    const result = await this.agent_sessionService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: agent_sessionEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the agent_session table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["session_id"] = req.headers.session_id || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["initiator_type"] = req.headers.initiator_type || "";
      detokenizeData["created_at"] = req.headers.created_at || "";
      detokenizeData["channel"] = req.headers.channel || "";
      detokenizeData["started_at"] = req.headers.started_at || "";
      detokenizeData["ended_at"] = req.headers.ended_at || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["llm_calls"] = req.headers.llm_calls || "";
      detokenizeData["tool_calls"] = req.headers.tool_calls || "";
      detokenizeData["a2a_calls"] = req.headers.a2a_calls || "";
      detokenizeData["policy_denials"] = req.headers.policy_denials || "";
      detokenizeData["hitl_requests"] = req.headers.hitl_requests || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["cost_currency"] = req.headers.cost_currency || "";
      detokenizeData["trace_completeness"] = req.headers.trace_completeness || "";
      detokenizeData["row_version"] = req.headers.row_version || "";
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
    const result = await this.agent_sessionService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.agent_sessionService.getLockById(key, value, token);
    return plainToInstance(agent_sessionEntity, result);
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
    const result = await this.agent_sessionService.releaseLockById(key, value, token);
    return result;
  }

  @Post('/createMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createagent_sessionDto, isArray: true })
  @ApiCreatedResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Create multiple records',
    description: 'Create multiple records for the agent_session table',
  })
  async createMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() createagent_sessionDtos: Createagent_sessionDto[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.agent_sessionService.createMany(createagent_sessionDtos, token, detokenize, {}, req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }

  @Patch('/updateMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateagent_sessionDto, isArray: true })
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Update multiple records',
    description: 'Update multiple records for the agent_session table',
  })
  async updateMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() updateagent_sessionDtos: Updateagent_sessionDto[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.agent_sessionService.updateMany(updateagent_sessionDtos, token, detokenize, {}, req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }

  @Delete('/deleteMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          session_id: { type: 'bigint' },
        },
        required: ['session_id'],
      },
    },
  })
  @ApiOkResponse({ type: agent_sessionEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete multiple records',
    description: 'Delete multiple records from the agent_session table',
  })
  async deleteMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() ids: { session_id: bigint }[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.agent_sessionService.deleteMany(ids, token, detokenize, {}, req.authContext);
    return plainToInstance(agent_sessionEntity, result);
  }
}