

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { wps_mohre_employee_dtlService } from './wps_mohre_employee_dtl.service';
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
import { wps_mohre_employee_dtlEntity } from './entity/wps_mohre_employee_dtl.entity';
//import { CreateWpsMohreEmployeeDtlDto } from '../prisma/dto/create-wpsMohreEmployeeDtl.dto';
//import { UpdateWpsMohreEmployeeDtlDto } from '../prisma/dto/update-wpsMohreEmployeeDtl.dto';
import { Createwps_mohre_employee_dtlDto } from './dto/Createwps_mohre_employee_dtl.dto';
import { Updatewps_mohre_employee_dtlDto } from './dto/Updatewps_mohre_employee_dtl.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('wps_mohre_employee_dtl')
@ApiTags('ERD API')
export class wps_mohre_employee_dtlController {
  constructor(
    private readonly wps_mohre_employee_dtlService: wps_mohre_employee_dtlService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the wps_mohre_employee_dtl table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.wps_mohre_employee_dtlService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the wps_mohre_employee_dtl table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.wps_mohre_employee_dtlService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':wpsmed_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'wpsmed_id',type:Number})
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the wps_mohre_employee_dtl table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('wpsmed_id') wpsmed_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
    const result = await this.wps_mohre_employee_dtlService.findOne(+wpsmed_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the wps_mohre_employee_dtl table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
    const result = await this.wps_mohre_employee_dtlService.findAll(token,req.authContext,detokenize,detokenizeData,);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('wps_mohre_employee_dtl'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createwps_mohre_employee_dtlDto })
  @ApiCreatedResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the wps_mohre_employee_dtl table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createwps_mohre_employee_dtlDto: Createwps_mohre_employee_dtlDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
      const result = await this.wps_mohre_employee_dtlService.createMaster(createwps_mohre_employee_dtlDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.wps_mohre_employee_dtlService.create(createwps_mohre_employee_dtlDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
 
  @Patch(':wpsmed_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('wps_mohre_employee_dtl', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsmed_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatewps_mohre_employee_dtlDto })
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the wps_mohre_employee_dtl table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('wpsmed_id') wpsmed_id:number,
    @Body() updatewps_mohre_employee_dtlDto: Updatewps_mohre_employee_dtlDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
      const result = await this.wps_mohre_employee_dtlService.updateMaster(+wpsmed_id,updatewps_mohre_employee_dtlDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.wps_mohre_employee_dtlService.update(+wpsmed_id,updatewps_mohre_employee_dtlDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }
 
  @Delete(':wpsmed_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'wpsmed_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the wps_mohre_employee_dtl table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('wpsmed_id') wpsmed_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
      const result = await this.wps_mohre_employee_dtlService.deleteMaster(+wpsmed_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.wps_mohre_employee_dtlService.remove(+wpsmed_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the wps_mohre_employee_dtl table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
    const result = await this.wps_mohre_employee_dtlService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the wps_mohre_employee_dtl table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["wpsmed_id"] = req.headers.wpsmed_id || "";
      detokenizeData["wpsmac_id"] = req.headers.wpsmac_id || "";
      detokenizeData["employer_mol_number"] = req.headers.employer_mol_number || "";
      detokenizeData["employee_mol_number"] = req.headers.employee_mol_number || "";
      detokenizeData["employer_reg_id"] = req.headers.employer_reg_id || "";
      detokenizeData["employer_eid"] = req.headers.employer_eid || "";
      detokenizeData["mohre_reg_status"] = req.headers.mohre_reg_status || "";
      detokenizeData["employee_card_number"] = req.headers.employee_card_number || "";
      detokenizeData["employee_unified_number"] = req.headers.employee_unified_number || "";
      detokenizeData["employee_eid"] = req.headers.employee_eid || "";
      detokenizeData["employee_is_active"] = req.headers.employee_is_active || "";
      detokenizeData["employee_passport_number"] = req.headers.employee_passport_number || "";
      detokenizeData["employee_name"] = req.headers.employee_name || "";
      detokenizeData["employee_name_ar"] = req.headers.employee_name_ar || "";
      detokenizeData["total_salary"] = req.headers.total_salary || "";
      detokenizeData["status_date"] = req.headers.status_date || "";
      detokenizeData["employee_iban"] = req.headers.employee_iban || "";
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
    const result = await this.wps_mohre_employee_dtlService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: wps_mohre_employee_dtlEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.wps_mohre_employee_dtlService.getLockById(key, value, token);
    return plainToInstance(wps_mohre_employee_dtlEntity, result);
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
    const result = await this.wps_mohre_employee_dtlService.releaseLockById(key, value, token);
    return result;
  }
}