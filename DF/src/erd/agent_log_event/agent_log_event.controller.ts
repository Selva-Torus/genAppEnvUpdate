
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { agent_log_eventService } from './agent_log_event.service';
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
import { agent_log_eventEntity } from './entity/agent_log_event.entity';
//import { CreateAgentLogEventDto } from '../prisma/dto/create-agentLogEvent.dto';
//import { UpdateAgentLogEventDto } from '../prisma/dto/update-agentLogEvent.dto';
import { Createagent_log_eventDto } from './dto/Createagent_log_event.dto';
import { Updateagent_log_eventDto } from './dto/Updateagent_log_event.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('agent_log_event')
@ApiTags('ERD API')
export class agent_log_eventController {
  constructor(
    private readonly agent_log_eventService: agent_log_eventService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_log_eventEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the agent_log_event table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.agent_log_eventService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the agent_log_event table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.agent_log_eventService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':log_event_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'log_event_id',type:Number})
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the agent_log_event table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('log_event_id') log_event_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
    const result = await this.agent_log_eventService.findOne(+log_event_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the agent_log_event table',
  })
  @ApiQuery({ name: 'log_event_id', required: false})
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query('log_event_id') log_event_id?:string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
      'log_event_id',
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
    const result = await this.agent_log_eventService.findAll(token,req.authContext,detokenize,detokenizeData,+log_event_id);
    return plainToInstance(agent_log_eventEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('agent_log_event'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createagent_log_eventDto })
  @ApiCreatedResponse({ type: agent_log_eventEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the agent_log_event table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createagent_log_eventDto: Createagent_log_eventDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
      const result = await this.agent_log_eventService.createMaster(createagent_log_eventDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.agent_log_eventService.create(createagent_log_eventDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }
 
  @Patch(':log_event_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('agent_log_event', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'log_event_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateagent_log_eventDto })
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the agent_log_event table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('log_event_id') log_event_id:number,
    @Body() updateagent_log_eventDto: Updateagent_log_eventDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
      const result = await this.agent_log_eventService.updateMaster(+log_event_id,updateagent_log_eventDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.agent_log_eventService.update(+log_event_id,updateagent_log_eventDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }
 
  @Delete(':log_event_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'log_event_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the agent_log_event table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('log_event_id') log_event_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
      const result = await this.agent_log_eventService.deleteMaster(+log_event_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.agent_log_eventService.remove(+log_event_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: agent_log_eventEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the agent_log_event table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
    const result = await this.agent_log_eventService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: agent_log_eventEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the agent_log_event table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["log_event_id"] = req.headers.log_event_id || "";
      detokenizeData["event_time"] = req.headers.event_time || "";
      detokenizeData["event_uid"] = req.headers.event_uid || "";
      detokenizeData["spec_version"] = req.headers.spec_version || "";
      detokenizeData["event_type"] = req.headers.event_type || "";
      detokenizeData["event_source"] = req.headers.event_source || "";
      detokenizeData["agent_urn"] = req.headers.agent_urn || "";
      detokenizeData["agent_version"] = req.headers.agent_version || "";
      detokenizeData["session_uid"] = req.headers.session_uid || "";
      detokenizeData["trace_id"] = req.headers.trace_id || "";
      detokenizeData["span_id"] = req.headers.span_id || "";
      detokenizeData["parent_span_id"] = req.headers.parent_span_id || "";
      detokenizeData["seq_no"] = req.headers.seq_no || "";
      detokenizeData["severity"] = req.headers.severity || "";
      detokenizeData["operation_name"] = req.headers.operation_name || "";
      detokenizeData["gen_ai_provider"] = req.headers.gen_ai_provider || "";
      detokenizeData["gen_ai_model"] = req.headers.gen_ai_model || "";
      detokenizeData["tool_name"] = req.headers.tool_name || "";
      detokenizeData["mcp_server_urn"] = req.headers.mcp_server_urn || "";
      detokenizeData["target_agent_urn"] = req.headers.target_agent_urn || "";
      detokenizeData["side_effect_class"] = req.headers.side_effect_class || "";
      detokenizeData["outcome"] = req.headers.outcome || "";
      detokenizeData["duration_ms"] = req.headers.duration_ms || "";
      detokenizeData["input_tokens"] = req.headers.input_tokens || "";
      detokenizeData["output_tokens"] = req.headers.output_tokens || "";
      detokenizeData["cost_amount"] = req.headers.cost_amount || "";
      detokenizeData["policy_decision_uid"] = req.headers.policy_decision_uid || "";
      detokenizeData["capture_mode"] = req.headers.capture_mode || "";
      detokenizeData["payload_ref"] = req.headers.payload_ref || "";
      detokenizeData["payload_sha256"] = req.headers.payload_sha256 || "";
      detokenizeData["attributes"] = req.headers.attributes || "";
      detokenizeData["prev_event_hash"] = req.headers.prev_event_hash || "";
      detokenizeData["event_hash"] = req.headers.event_hash || "";
      detokenizeData["ingest_validation"] = req.headers.ingest_validation || "";
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
    const result = await this.agent_log_eventService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.agent_log_eventService.getLockById(key, value, token);
    return plainToInstance(agent_log_eventEntity, result);
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
    const result = await this.agent_log_eventService.releaseLockById(key, value, token);
    return result;
  }

  @Post('/createMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createagent_log_eventDto, isArray: true })
  @ApiCreatedResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Create multiple records',
    description: 'Create multiple records for the agent_log_event table',
  })
  async createMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() createagent_log_eventDtos: Createagent_log_eventDto[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.agent_log_eventService.createMany(createagent_log_eventDtos, token, detokenize, {}, req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }

  @Patch('/updateMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateagent_log_eventDto, isArray: true })
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Update multiple records',
    description: 'Update multiple records for the agent_log_event table',
  })
  async updateMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() updateagent_log_eventDtos: Updateagent_log_eventDto[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.agent_log_eventService.updateMany(updateagent_log_eventDtos, token, detokenize, {}, req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
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
          log_event_id: { type: 'bigint' },
        },
        required: ['log_event_id'],
      },
    },
  })
  @ApiOkResponse({ type: agent_log_eventEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete multiple records',
    description: 'Delete multiple records from the agent_log_event table',
  })
  async deleteMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() ids: { log_event_id: bigint }[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.agent_log_eventService.deleteMany(ids, token, detokenize, {}, req.authContext);
    return plainToInstance(agent_log_eventEntity, result);
  }
}