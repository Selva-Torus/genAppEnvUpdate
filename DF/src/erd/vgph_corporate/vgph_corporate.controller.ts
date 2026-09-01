

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { vgph_corporateService } from './vgph_corporate.service';
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
import { vgph_corporateEntity } from './entity/vgph_corporate.entity';
//import { CreateVgphCorporateDto } from '../prisma/dto/create-vgphCorporate.dto';
//import { UpdateVgphCorporateDto } from '../prisma/dto/update-vgphCorporate.dto';
import { Createvgph_corporateDto } from './dto/Createvgph_corporate.dto';
import { Updatevgph_corporateDto } from './dto/Updatevgph_corporate.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('vgph_corporate')
@ApiTags('ERD API')
export class vgph_corporateController {
  constructor(
    private readonly vgph_corporateService: vgph_corporateService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_corporateEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the vgph_corporate table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.vgph_corporateService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_corporateEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the vgph_corporate table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.vgph_corporateService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':vgphc_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'vgphc_id',type:Number})
  @ApiOkResponse({ type: vgph_corporateEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the vgph_corporate table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('vgphc_id') vgphc_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
    const result = await this.vgph_corporateService.findOne(+vgphc_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_corporateEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_corporateEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the vgph_corporate table',
  })
  @ApiQuery({ name: 'vgphc_id', required: false})
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query('vgphc_id') vgphc_id?:string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
      'vgphc_id',
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
    const result = await this.vgph_corporateService.findAll(token,req.authContext,detokenize,detokenizeData,+vgphc_id);
    return plainToInstance(vgph_corporateEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('vgph_corporate'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createvgph_corporateDto })
  @ApiCreatedResponse({ type: vgph_corporateEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the vgph_corporate table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createvgph_corporateDto: Createvgph_corporateDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
      const result = await this.vgph_corporateService.createMaster(createvgph_corporateDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.vgph_corporateService.create(createvgph_corporateDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_corporateEntity, result);
  }
 
  @Patch(':vgphc_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('vgph_corporate', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'vgphc_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatevgph_corporateDto })
  @ApiOkResponse({ type: vgph_corporateEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the vgph_corporate table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('vgphc_id') vgphc_id:number,
    @Body() updatevgph_corporateDto: Updatevgph_corporateDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
      const result = await this.vgph_corporateService.updateMaster(+vgphc_id,updatevgph_corporateDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.vgph_corporateService.update(+vgphc_id,updatevgph_corporateDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_corporateEntity, result);
  }
 
  @Delete(':vgphc_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'vgphc_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: vgph_corporateEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the vgph_corporate table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('vgphc_id') vgphc_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
      const result = await this.vgph_corporateService.deleteMaster(+vgphc_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.vgph_corporateService.remove(+vgphc_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_corporateEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: vgph_corporateEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the vgph_corporate table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
    const result = await this.vgph_corporateService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_corporateEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: vgph_corporateEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the vgph_corporate table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphc_id"] = req.headers.vgphc_id || "";
      detokenizeData["vgphsc_uuid"] = req.headers.vgphsc_uuid || "";
      detokenizeData["uuid"] = req.headers.uuid || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["account_number"] = req.headers.account_number || "";
      detokenizeData["name"] = req.headers.name || "";
      detokenizeData["type"] = req.headers.type || "";
      detokenizeData["inception_date"] = req.headers.inception_date || "";
      detokenizeData["mobile_number"] = req.headers.mobile_number || "";
      detokenizeData["email"] = req.headers.email || "";
      detokenizeData["address1"] = req.headers.address1 || "";
      detokenizeData["address2"] = req.headers.address2 || "";
      detokenizeData["address3"] = req.headers.address3 || "";
      detokenizeData["address4"] = req.headers.address4 || "";
      detokenizeData["country"] = req.headers.country || "";
      detokenizeData["zip"] = req.headers.zip || "";
      detokenizeData["state"] = req.headers.state || "";
      detokenizeData["city"] = req.headers.city || "";
      detokenizeData["reference_id"] = req.headers.reference_id || "";
      detokenizeData["landline_no"] = req.headers.landline_no || "";
      detokenizeData["is_active"] = req.headers.is_active || "";
      detokenizeData["product_basic"] = req.headers.product_basic || "";
      detokenizeData["product_additional"] = req.headers.product_additional || "";
      detokenizeData["contacts"] = req.headers.contacts || "";
      detokenizeData["request_data"] = req.headers.request_data || "";
      detokenizeData["response_data"] = req.headers.response_data || "";
      detokenizeData["compliance_data"] = req.headers.compliance_data || "";
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
    const result = await this.vgph_corporateService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_corporateEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_corporateEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.vgph_corporateService.getLockById(key, value, token);
    return plainToInstance(vgph_corporateEntity, result);
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
    const result = await this.vgph_corporateService.releaseLockById(key, value, token);
    return result;
  }
}