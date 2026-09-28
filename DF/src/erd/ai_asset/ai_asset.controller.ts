

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { ai_assetService } from './ai_asset.service';
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
import { ai_assetEntity } from './entity/ai_asset.entity';
//import { CreateAiAssetDto } from '../prisma/dto/create-aiAsset.dto';
//import { UpdateAiAssetDto } from '../prisma/dto/update-aiAsset.dto';
import { Createai_assetDto } from './dto/Createai_asset.dto';
import { Updateai_assetDto } from './dto/Updateai_asset.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('ai_asset')
@ApiTags('ERD API')
export class ai_assetController {
  constructor(
    private readonly ai_assetService: ai_assetService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ai_assetEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the ai_asset table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.ai_assetService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ai_assetEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the ai_asset table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.ai_assetService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':ai_asset_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'ai_asset_id',type:Number})
  @ApiOkResponse({ type: ai_assetEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the ai_asset table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('ai_asset_id') ai_asset_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
    const result = await this.ai_assetService.findOne(+ai_asset_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(ai_assetEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ai_assetEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the ai_asset table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
    const result = await this.ai_assetService.findAll(token,req.authContext,detokenize,detokenizeData,);
    return plainToInstance(ai_assetEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('ai_asset'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createai_assetDto })
  @ApiCreatedResponse({ type: ai_assetEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the ai_asset table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createai_assetDto: Createai_assetDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
      const result = await this.ai_assetService.createMaster(createai_assetDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.ai_assetService.create(createai_assetDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(ai_assetEntity, result);
  }
 
  @Patch(':ai_asset_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('ai_asset', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'ai_asset_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updateai_assetDto })
  @ApiOkResponse({ type: ai_assetEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the ai_asset table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('ai_asset_id') ai_asset_id:number,
    @Body() updateai_assetDto: Updateai_assetDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
      const result = await this.ai_assetService.updateMaster(+ai_asset_id,updateai_assetDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.ai_assetService.update(+ai_asset_id,updateai_assetDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(ai_assetEntity, result);
  }
 
  @Delete(':ai_asset_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'ai_asset_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: ai_assetEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the ai_asset table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('ai_asset_id') ai_asset_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
      const result = await this.ai_assetService.deleteMaster(+ai_asset_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.ai_assetService.remove(+ai_asset_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(ai_assetEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ai_assetEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the ai_asset table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
    const result = await this.ai_assetService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(ai_assetEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: ai_assetEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the ai_asset table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ai_asset_id"] = req.headers.ai_asset_id || "";
      detokenizeData["asset_code"] = req.headers.asset_code || "";
      detokenizeData["asset_name"] = req.headers.asset_name || "";
      detokenizeData["asset_type_code"] = req.headers.asset_type_code || "";
      detokenizeData["short_description"] = req.headers.short_description || "";
      detokenizeData["use_case_code"] = req.headers.use_case_code || "";
      detokenizeData["business_unit_id"] = req.headers.business_unit_id || "";
      detokenizeData["business_owner_id"] = req.headers.business_owner_id || "";
      detokenizeData["technical_owner_id"] = req.headers.technical_owner_id || "";
      detokenizeData["vendor_name"] = req.headers.vendor_name || "";
      detokenizeData["is_third_party"] = req.headers.is_third_party || "";
      detokenizeData["hosting_location"] = req.headers.hosting_location || "";
      detokenizeData["risk_tier_code"] = req.headers.risk_tier_code || "";
      detokenizeData["risk_tier_source"] = req.headers.risk_tier_source || "";
      detokenizeData["criticality_code"] = req.headers.criticality_code || "";
      detokenizeData["lifecycle_status_code"] = req.headers.lifecycle_status_code || "";
      detokenizeData["is_customer_facing"] = req.headers.is_customer_facing || "";
      detokenizeData["is_automated_decision"] = req.headers.is_automated_decision || "";
      detokenizeData["current_certification_id"] = req.headers.current_certification_id || "";
      detokenizeData["cert_expiry_date"] = req.headers.cert_expiry_date || "";
      detokenizeData["discovery_source_code"] = req.headers.discovery_source_code || "";
      detokenizeData["integration_source_id"] = req.headers.integration_source_id || "";
      detokenizeData["external_reference"] = req.headers.external_reference || "";
      detokenizeData["first_discovered_on"] = req.headers.first_discovered_on || "";
      detokenizeData["last_seen_on"] = req.headers.last_seen_on || "";
      detokenizeData["go_live_date"] = req.headers.go_live_date || "";
      detokenizeData["retirement_date"] = req.headers.retirement_date || "";
      detokenizeData["current_version_no"] = req.headers.current_version_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["business_unit_name"] = req.headers.business_unit_name || "";
      detokenizeData["business_owner_name"] = req.headers.business_owner_name || "";
      detokenizeData["business_owner_job_title"] = req.headers.business_owner_job_title || "";
      detokenizeData["technical_owner_name"] = req.headers.technical_owner_name || "";
      detokenizeData["technical_owner_job_title"] = req.headers.technical_owner_job_title || "";
      detokenizeData["business_purpose"] = req.headers.business_purpose || "";
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
    const result = await this.ai_assetService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(ai_assetEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ai_assetEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.ai_assetService.getLockById(key, value, token);
    return plainToInstance(ai_assetEntity, result);
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
    const result = await this.ai_assetService.releaseLockById(key, value, token);
    return result;
  }
}