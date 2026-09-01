

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { vgph_charge_setupService } from './vgph_charge_setup.service';
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
import { vgph_charge_setupEntity } from './entity/vgph_charge_setup.entity';
//import { CreateVgphChargeSetupDto } from '../prisma/dto/create-vgphChargeSetup.dto';
//import { UpdateVgphChargeSetupDto } from '../prisma/dto/update-vgphChargeSetup.dto';
import { Createvgph_charge_setupDto } from './dto/Createvgph_charge_setup.dto';
import { Updatevgph_charge_setupDto } from './dto/Updatevgph_charge_setup.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('vgph_charge_setup')
@ApiTags('ERD API')
export class vgph_charge_setupController {
  constructor(
    private readonly vgph_charge_setupService: vgph_charge_setupService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_charge_setupEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the vgph_charge_setup table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.vgph_charge_setupService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_charge_setupEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the vgph_charge_setup table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.vgph_charge_setupService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':vgphcs_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'vgphcs_id',type:Number})
  @ApiOkResponse({ type: vgph_charge_setupEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the vgph_charge_setup table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('vgphcs_id') vgphcs_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
    const result = await this.vgph_charge_setupService.findOne(+vgphcs_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_charge_setupEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_charge_setupEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the vgph_charge_setup table',
  })
  @ApiQuery({ name: 'vgphcs_id', required: false})
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query('vgphcs_id') vgphcs_id?:string,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
      'vgphcs_id',
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
    const result = await this.vgph_charge_setupService.findAll(token,req.authContext,detokenize,detokenizeData,+vgphcs_id);
    return plainToInstance(vgph_charge_setupEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('vgph_charge_setup'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createvgph_charge_setupDto })
  @ApiCreatedResponse({ type: vgph_charge_setupEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the vgph_charge_setup table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createvgph_charge_setupDto: Createvgph_charge_setupDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
      const result = await this.vgph_charge_setupService.createMaster(createvgph_charge_setupDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.vgph_charge_setupService.create(createvgph_charge_setupDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_charge_setupEntity, result);
  }
 
  @Patch(':vgphcs_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('vgph_charge_setup', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'vgphcs_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatevgph_charge_setupDto })
  @ApiOkResponse({ type: vgph_charge_setupEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the vgph_charge_setup table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('vgphcs_id') vgphcs_id:number,
    @Body() updatevgph_charge_setupDto: Updatevgph_charge_setupDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
      const result = await this.vgph_charge_setupService.updateMaster(+vgphcs_id,updatevgph_charge_setupDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.vgph_charge_setupService.update(+vgphcs_id,updatevgph_charge_setupDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_charge_setupEntity, result);
  }
 
  @Delete(':vgphcs_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'vgphcs_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: vgph_charge_setupEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the vgph_charge_setup table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('vgphcs_id') vgphcs_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
      const result = await this.vgph_charge_setupService.deleteMaster(+vgphcs_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.vgph_charge_setupService.remove(+vgphcs_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_charge_setupEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: vgph_charge_setupEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the vgph_charge_setup table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
    const result = await this.vgph_charge_setupService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_charge_setupEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: vgph_charge_setupEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the vgph_charge_setup table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["vgphcs_id"] = req.headers.vgphcs_id || "";
      detokenizeData["process_category"] = req.headers.process_category || "";
      detokenizeData["charge_category"] = req.headers.charge_category || "";
      detokenizeData["charge_code"] = req.headers.charge_code || "";
      detokenizeData["charge_name"] = req.headers.charge_name || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["processing_system"] = req.headers.processing_system || "";
      detokenizeData["charge_type"] = req.headers.charge_type || "";
      detokenizeData["charge_amount"] = req.headers.charge_amount || "";
      detokenizeData["min_charge_amt"] = req.headers.min_charge_amt || "";
      detokenizeData["max_charge_amt"] = req.headers.max_charge_amt || "";
      detokenizeData["vat_flag"] = req.headers.vat_flag || "";
      detokenizeData["vat_percentage"] = req.headers.vat_percentage || "";
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
    const result = await this.vgph_charge_setupService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(vgph_charge_setupEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: vgph_charge_setupEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.vgph_charge_setupService.getLockById(key, value, token);
    return plainToInstance(vgph_charge_setupEntity, result);
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
    const result = await this.vgph_charge_setupService.releaseLockById(key, value, token);
    return result;
  }
}