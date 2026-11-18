
import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { authority_grantService } from './authority_grant.service';
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
import { authority_grantEntity } from './entity/authority_grant.entity';
//import { CreateAuthorityGrantDto } from '../prisma/dto/create-authorityGrant.dto';
//import { UpdateAuthorityGrantDto } from '../prisma/dto/update-authorityGrant.dto';
import { Createauthority_grantDto } from './dto/Createauthority_grant.dto';
import { Updateauthority_grantDto } from './dto/Updateauthority_grant.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('authority_grant')
@ApiTags('ERD API')
export class authority_grantController {
  constructor(
    private readonly authority_grantService: authority_grantService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: authority_grantEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the authority_grant table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.authority_grantService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the authority_grant table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.authority_grantService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':authority_grant_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'authority_grant_id',type:Number})
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the authority_grant table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('authority_grant_id') authority_grant_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
    const result = await this.authority_grantService.findOne(+authority_grant_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the authority_grant table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
    const result = await this.authority_grantService.findAll(token,req.authContext,detokenize,detokenizeData,);
    return plainToInstance(authority_grantEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('authority_grant'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createauthority_grantDto })
  @ApiCreatedResponse({ type: authority_grantEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the authority_grant table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createauthority_grantDto: Createauthority_grantDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
      const result = await this.authority_grantService.createMaster(createauthority_grantDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.authority_grantService.create(createauthority_grantDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }
 
  @Patch(':authority_grant_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('authority_grant', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'authority_grant_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateauthority_grantDto })
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the authority_grant table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('authority_grant_id') authority_grant_id:number,
    @Body() updateauthority_grantDto: Updateauthority_grantDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
      const result = await this.authority_grantService.updateMaster(+authority_grant_id,updateauthority_grantDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.authority_grantService.update(+authority_grant_id,updateauthority_grantDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }
 
  @Delete(':authority_grant_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'authority_grant_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the authority_grant table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('authority_grant_id') authority_grant_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
      const result = await this.authority_grantService.deleteMaster(+authority_grant_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.authority_grantService.remove(+authority_grant_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: authority_grantEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the authority_grant table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
    const result = await this.authority_grantService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: authority_grantEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the authority_grant table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["authority_grant_id"] = req.headers.authority_grant_id || "";
      detokenizeData["grant_code"] = req.headers.grant_code || "";
      detokenizeData["delegator_user_id"] = req.headers.delegator_user_id || "";
      detokenizeData["action_type"] = req.headers.action_type || "";
      detokenizeData["resource_scope"] = req.headers.resource_scope || "";
      detokenizeData["max_amount_per_txn"] = req.headers.max_amount_per_txn || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["daily_amount_limit"] = req.headers.daily_amount_limit || "";
      detokenizeData["max_txn_per_day"] = req.headers.max_txn_per_day || "";
      detokenizeData["hitl_threshold_amount"] = req.headers.hitl_threshold_amount || "";
      detokenizeData["conditions"] = req.headers.conditions || "";
      detokenizeData["status"] = req.headers.status || "";
      detokenizeData["valid_from"] = req.headers.valid_from || "";
      detokenizeData["valid_to"] = req.headers.valid_to || "";
      detokenizeData["revoked_at"] = req.headers.revoked_at || "";
      detokenizeData["revocation_reason"] = req.headers.revocation_reason || "";
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
    const result = await this.authority_grantService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.authority_grantService.getLockById(key, value, token);
    return plainToInstance(authority_grantEntity, result);
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
    const result = await this.authority_grantService.releaseLockById(key, value, token);
    return result;
  }

  @Post('/createMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createauthority_grantDto, isArray: true })
  @ApiCreatedResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Create multiple records',
    description: 'Create multiple records for the authority_grant table',
  })
  async createMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() createauthority_grantDtos: Createauthority_grantDto[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.authority_grantService.createMany(createauthority_grantDtos, token, detokenize, {}, req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }

  @Patch('/updateMany')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateauthority_grantDto, isArray: true })
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Update multiple records',
    description: 'Update multiple records for the authority_grant table',
  })
  async updateMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() updateauthority_grantDtos: Updateauthority_grantDto[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.authority_grantService.updateMany(updateauthority_grantDtos, token, detokenize, {}, req.authContext);
    return plainToInstance(authority_grantEntity, result);
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
          authority_grant_id: { type: 'bigint' },
        },
        required: ['authority_grant_id'],
      },
    },
  })
  @ApiOkResponse({ type: authority_grantEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete multiple records',
    description: 'Delete multiple records from the authority_grant table',
  })
  async deleteMany(
    @Headers('xDetokenize') detokenize: string,
    @Headers() authHeader: string,
    @Body() ids: { authority_grant_id: bigint }[],
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    const result = await this.authority_grantService.deleteMany(ids, token, detokenize, {}, req.authContext);
    return plainToInstance(authority_grantEntity, result);
  }
}