

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { npss_camt_acc_crdr_ntfnService } from './npss_camt_acc_crdr_ntfn.service';
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
import { npss_camt_acc_crdr_ntfnEntity } from './entity/npss_camt_acc_crdr_ntfn.entity';
//import { CreateNpssCamtAccCrdrNtfnDto } from '../prisma/dto/create-npssCamtAccCrdrNtfn.dto';
//import { UpdateNpssCamtAccCrdrNtfnDto } from '../prisma/dto/update-npssCamtAccCrdrNtfn.dto';
import { Createnpss_camt_acc_crdr_ntfnDto } from './dto/Createnpss_camt_acc_crdr_ntfn.dto';
import { Updatenpss_camt_acc_crdr_ntfnDto } from './dto/Updatenpss_camt_acc_crdr_ntfn.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('npss_camt_acc_crdr_ntfn')
@ApiTags('ERD API')
export class npss_camt_acc_crdr_ntfnController {
  constructor(
    private readonly npss_camt_acc_crdr_ntfnService: npss_camt_acc_crdr_ntfnService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the npss_camt_acc_crdr_ntfn table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.npss_camt_acc_crdr_ntfnService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the npss_camt_acc_crdr_ntfn table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.npss_camt_acc_crdr_ntfnService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':ncacn_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'ncacn_id',type:Number})
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the npss_camt_acc_crdr_ntfn table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('ncacn_id') ncacn_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
    const result = await this.npss_camt_acc_crdr_ntfnService.findOne(+ncacn_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the npss_camt_acc_crdr_ntfn table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
    const result = await this.npss_camt_acc_crdr_ntfnService.findAll(token,req.authContext,detokenize,detokenizeData,);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('npss_camt_acc_crdr_ntfn'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createnpss_camt_acc_crdr_ntfnDto })
  @ApiCreatedResponse({ type: npss_camt_acc_crdr_ntfnEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the npss_camt_acc_crdr_ntfn table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createnpss_camt_acc_crdr_ntfnDto: Createnpss_camt_acc_crdr_ntfnDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
      const result = await this.npss_camt_acc_crdr_ntfnService.createMaster(createnpss_camt_acc_crdr_ntfnDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.npss_camt_acc_crdr_ntfnService.create(createnpss_camt_acc_crdr_ntfnDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  }
 
  @Patch(':ncacn_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('npss_camt_acc_crdr_ntfn', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'ncacn_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatenpss_camt_acc_crdr_ntfnDto })
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the npss_camt_acc_crdr_ntfn table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('ncacn_id') ncacn_id:number,
    @Body() updatenpss_camt_acc_crdr_ntfnDto: Updatenpss_camt_acc_crdr_ntfnDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
      const result = await this.npss_camt_acc_crdr_ntfnService.updateMaster(+ncacn_id,updatenpss_camt_acc_crdr_ntfnDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.npss_camt_acc_crdr_ntfnService.update(+ncacn_id,updatenpss_camt_acc_crdr_ntfnDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  }
 
  @Delete(':ncacn_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'ncacn_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the npss_camt_acc_crdr_ntfn table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('ncacn_id') ncacn_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
      const result = await this.npss_camt_acc_crdr_ntfnService.deleteMaster(+ncacn_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.npss_camt_acc_crdr_ntfnService.remove(+ncacn_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the npss_camt_acc_crdr_ntfn table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
    const result = await this.npss_camt_acc_crdr_ntfnService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the npss_camt_acc_crdr_ntfn table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncacn_id"] = req.headers.ncacn_id || "";
      detokenizeData["header_msg_id"] = req.headers.header_msg_id || "";
      detokenizeData["notification_id"] = req.headers.notification_id || "";
      detokenizeData["ntfn_created_datetime"] = req.headers.ntfn_created_datetime || "";
      detokenizeData["iban"] = req.headers.iban || "";
      detokenizeData["currency"] = req.headers.currency || "";
      detokenizeData["limit_amount"] = req.headers.limit_amount || "";
      detokenizeData["cr_dr_indicator"] = req.headers.cr_dr_indicator || "";
      detokenizeData["ntfn_status"] = req.headers.ntfn_status || "";
      detokenizeData["booking_datetime"] = req.headers.booking_datetime || "";
      detokenizeData["end_to_end_id"] = req.headers.end_to_end_id || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["ntfn_account_id"] = req.headers.ntfn_account_id || "";
      detokenizeData["account_type_code"] = req.headers.account_type_code || "";
      detokenizeData["bank_tran_code"] = req.headers.bank_tran_code || "";
      detokenizeData["bank_domain_code"] = req.headers.bank_domain_code || "";
      detokenizeData["bank_tran_prop_code"] = req.headers.bank_tran_prop_code || "";
      detokenizeData["dbtr_acct_id"] = req.headers.dbtr_acct_id || "";
      detokenizeData["cdtr_acct_id"] = req.headers.cdtr_acct_id || "";
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
    const result = await this.npss_camt_acc_crdr_ntfnService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_crdr_ntfnEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.npss_camt_acc_crdr_ntfnService.getLockById(key, value, token);
    return plainToInstance(npss_camt_acc_crdr_ntfnEntity, result);
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
    const result = await this.npss_camt_acc_crdr_ntfnService.releaseLockById(key, value, token);
    return result;
  }
}