

import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Req,NotFoundException,Headers,UsePipes,ValidationPipe,UnauthorizedException} from '@nestjs/common';
import { npss_camt_acc_stmtService } from './npss_camt_acc_stmt.service';
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
import { npss_camt_acc_stmtEntity } from './entity/npss_camt_acc_stmt.entity';
//import { CreateNpssCamtAccStmtDto } from '../prisma/dto/create-npssCamtAccStmt.dto';
//import { UpdateNpssCamtAccStmtDto } from '../prisma/dto/update-npssCamtAccStmt.dto';
import { Createnpss_camt_acc_stmtDto } from './dto/Createnpss_camt_acc_stmt.dto';
import { Updatenpss_camt_acc_stmtDto } from './dto/Updatenpss_camt_acc_stmt.dto';
import { plainToInstance } from 'class-transformer';
import { UfService } from 'src/Torus/v1/uf/uf.service';
import { PrismaModelValidationPipe } from 'src/pipes/prisma-model-validation.pipe';
import { JwtServices } from 'src/jwt.services';

 
@Controller('npss_camt_acc_stmt')
@ApiTags('ERD API')
export class npss_camt_acc_stmtController {
  constructor(
    private readonly npss_camt_acc_stmtService: npss_camt_acc_stmtService,
    private readonly ufservice: UfService,
    private readonly jwtServices: JwtServices
  ) {}

  @Get("/schema")
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity })
  @ApiOperation({
    summary: 'schema validation',
    description: 'Retrive the datatype of the npss_camt_acc_stmt table',
  })
  async findSchema(@Headers() authHeader: string,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    return this.npss_camt_acc_stmtService.findSchema(token);
  }

  @Get('/get')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity, isArray: true })
  @ApiOperation({
    summary: 'Filter the records',
    description: 'Filter all the records from the npss_camt_acc_stmt table',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' })
  async findAllmethod(@Headers() authHeader: string,@Query() query: any,@Body() body: any,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    //await this.ufservice.introspectToken(authHeader,"",token);
    const { limit }:{ limit:number } = query;
    const { selectColumns}:{ selectColumns:any } = body;
    const sortingcolumns = req?.headers?.sortingcolumns ?JSON.parse(req?.headers?.sortingcolumns):{};
    return this.npss_camt_acc_stmtService.findAllmethod(query, +limit,selectColumns,token,req.authContext,sortingcolumns);
  }

  @Get(':ncas_id')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiParam({name: 'ncas_id',type:Number})
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity, isArray: true })
  @ApiOperation({
    summary: 'Fetch the only one record',
    description: 'Read only one records from the npss_camt_acc_stmt table',
  })
  
  async findOne(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param('ncas_id') ncas_id:number,@Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
    const result = await this.npss_camt_acc_stmtService.findOne(+ncas_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  }
 
  @Get()
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity, isArray: true })
  @ApiOperation({
    summary: 'Read all the records',
    description: 'Read all the records from the npss_camt_acc_stmt table',
  })
  
  async findAll(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Req() req: any,@Query() query?: Record<string, any>) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
    const result = await this.npss_camt_acc_stmtService.findAll(token,req.authContext,detokenize,detokenizeData,);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  } 

  @Post()
  @UsePipes(new PrismaModelValidationPipe('npss_camt_acc_stmt'), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xCdcaApprovalID', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Createnpss_camt_acc_stmtDto })
  @ApiCreatedResponse({ type: npss_camt_acc_stmtEntity })
  @ApiOperation({
    summary: 'Create the record',
    description: 'Create the record for the npss_camt_acc_stmt table',
  })
  
  async create(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers('xCdcaApprovalID') mcApprovalID: string,
    @Headers() authHeader: string,
    @Body() createnpss_camt_acc_stmtDto: Createnpss_camt_acc_stmtDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
      const result = await this.npss_camt_acc_stmtService.createMaster(createnpss_camt_acc_stmtDto, makerInfo, token, req.authContext);
      return result;
    }

    const result = this.npss_camt_acc_stmtService.create(createnpss_camt_acc_stmtDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  }
 
  @Patch(':ncas_id')
  // Every field in Updateaccount_documentsDto is @IsOptional()-decorated, so
  // whitelist+forbidNonWhitelisted is safe here (unlike the global pipe,
  // which stays lenient for DTOs with undecorated fields) — it now rejects
  // body fields outside the DTO's declared shape instead of silently
  // accepting them into a Prisma update.
  @UsePipes(new PrismaModelValidationPipe('npss_camt_acc_stmt', true), new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'ncas_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiBody({ type: Updatenpss_camt_acc_stmtDto })
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity, isArray: true })
  @ApiOperation({
    summary: 'Update the record',
    description: 'Update the record for the npss_camt_acc_stmt table',
  })
    
  async update(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('ncas_id') ncas_id:number,
    @Body() updatenpss_camt_acc_stmtDto: Updatenpss_camt_acc_stmtDto,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
      const result = await this.npss_camt_acc_stmtService.updateMaster(+ncas_id,updatenpss_camt_acc_stmtDto,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.npss_camt_acc_stmtService.update(+ncas_id,updatenpss_camt_acc_stmtDto,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  }
 
  @Delete(':ncas_id')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({name: 'ncas_id',type:Number})
  @ApiHeader({ name: 'xCdcaRole', required: false })
  @ApiHeader({ name: 'xCdcaUsername', required: false })
  @ApiHeader({ name: 'xCdcaRemarks', required: false })
  @ApiHeader({ name: 'xCdcaApprovalStatus', required: false })
  @ApiHeader({ name: 'xDetokenize', required: false })
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity, isArray: true })
  @ApiOperation({
    summary: 'Delete the record',
    description: 'Delete the record for the npss_camt_acc_stmt table',
  })
  
  async remove(
    @Headers('xDetokenize') detokenize: string,
    @Headers('xCdcaRole') mcRole: string,
    @Headers('xCdcaUsername') mcUsername: string,
    @Headers('xCdcaRemarks') mcRemarks: string,
    @Headers('xCdcaApprovalStatus') mcApprovalStatus: string,
    @Headers() authHeader: string,
@Param('ncas_id') ncas_id:number,
    @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
      const result = await this.npss_camt_acc_stmtService.deleteMaster(+ncas_id,makerInfo,token,req.authContext);
      return result;
    }

    const result = await this.npss_camt_acc_stmtService.remove(+ncas_id,token,detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  }  
 
  @Get('/find/first')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity })
  @ApiOperation({
    summary: 'Fetch the first record',
    description: 'Read first record from the npss_camt_acc_stmt table',
  })
  
  async findFirst(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
    const result = await this.npss_camt_acc_stmtService.findFirst(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  }

  @Get('/find/last')
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'xDetokenize', required: false })
  //@ApiParam({name: ''})
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity })
  @ApiOperation({
    summary: 'Fetch the last record',
    description: 'Read last record from the npss_camt_acc_stmt table',
  })
  
  async findLast(@Headers('xDetokenize') detokenize: string,@Headers() authHeader: string,@Param() params: any, @Req() req: any) {
    const token = req.headers?.authorization?.split(' ')[1];
    let detokenizeData = {};
      detokenizeData["ncas_id"] = req.headers.ncas_id || "";
      detokenizeData["hdr_msg_id"] = req.headers.hdr_msg_id || "";
      detokenizeData["hdr_created_date_time"] = req.headers.hdr_created_date_time || "";
      detokenizeData["hdr_msg_rcpt"] = req.headers.hdr_msg_rcpt || "";
      detokenizeData["hdr_msg_rcpt_name"] = req.headers.hdr_msg_rcpt_name || "";
      detokenizeData["hdr_msg_rcpt_id"] = req.headers.hdr_msg_rcpt_id || "";
      detokenizeData["hdr_msg_rcpt_orgid"] = req.headers.hdr_msg_rcpt_orgid || "";
      detokenizeData["hdr_msg_rcpt_org_bic"] = req.headers.hdr_msg_rcpt_org_bic || "";
      detokenizeData["hdr_msg_pgnb"] = req.headers.hdr_msg_pgnb || "";
      detokenizeData["hdr_msg_last_pg_ind"] = req.headers.hdr_msg_last_pg_ind || "";
      detokenizeData["hdr_msg_addtlinf"] = req.headers.hdr_msg_addtlinf || "";
      detokenizeData["stmt_id"] = req.headers.stmt_id || "";
      detokenizeData["stmt_sequence_number"] = req.headers.stmt_sequence_number || "";
      detokenizeData["stmt_created_date_time"] = req.headers.stmt_created_date_time || "";
      detokenizeData["stmt_from_to_date_time"] = req.headers.stmt_from_to_date_time || "";
      detokenizeData["stmt_to_date_time"] = req.headers.stmt_to_date_time || "";
      detokenizeData["stmt_copy_dup_ind"] = req.headers.stmt_copy_dup_ind || "";
      detokenizeData["acct_id"] = req.headers.acct_id || "";
      detokenizeData["svcr_acct_id"] = req.headers.svcr_acct_id || "";
      detokenizeData["instn_acct_id"] = req.headers.instn_acct_id || "";
      detokenizeData["parent_acct_id"] = req.headers.parent_acct_id || "";
      detokenizeData["parent_svcr_acct_id"] = req.headers.parent_svcr_acct_id || "";
      detokenizeData["parent_inst_acct_id"] = req.headers.parent_inst_acct_id || "";
      detokenizeData["balance_type"] = req.headers.balance_type || "";
      detokenizeData["balance_type_code_prop"] = req.headers.balance_type_code_prop || "";
      detokenizeData["balance_type_prop"] = req.headers.balance_type_prop || "";
      detokenizeData["balance_amount"] = req.headers.balance_amount || "";
      detokenizeData["balance_crdb_ind"] = req.headers.balance_crdb_ind || "";
      detokenizeData["stmt_bal_date"] = req.headers.stmt_bal_date || "";
      detokenizeData["stmt_bal_date_time"] = req.headers.stmt_bal_date_time || "";
      detokenizeData["balance_type_prop_1"] = req.headers.balance_type_prop_1 || "";
      detokenizeData["balance_cur_1"] = req.headers.balance_cur_1 || "";
      detokenizeData["balance_amount_1"] = req.headers.balance_amount_1 || "";
      detokenizeData["balance_crdb_ind_1"] = req.headers.balance_crdb_ind_1 || "";
      detokenizeData["stmt_bal_date_1"] = req.headers.stmt_bal_date_1 || "";
      detokenizeData["stmt_bal_date_time_1"] = req.headers.stmt_bal_date_time_1 || "";
      detokenizeData["count_indv_entries"] = req.headers.count_indv_entries || "";
      detokenizeData["sum_indv_entries"] = req.headers.sum_indv_entries || "";
      detokenizeData["count_net_entries"] = req.headers.count_net_entries || "";
      detokenizeData["sum_net_entries"] = req.headers.sum_net_entries || "";
      detokenizeData["net_crdb_ind"] = req.headers.net_crdb_ind || "";
      detokenizeData["tot_cr_entries"] = req.headers.tot_cr_entries || "";
      detokenizeData["sum_cr_entries"] = req.headers.sum_cr_entries || "";
      detokenizeData["tot_db_entries"] = req.headers.tot_db_entries || "";
      detokenizeData["sum_db_entries"] = req.headers.sum_db_entries || "";
      detokenizeData["entry_ref"] = req.headers.entry_ref || "";
      detokenizeData["entry_amount"] = req.headers.entry_amount || "";
      detokenizeData["entry_crdb_ind"] = req.headers.entry_crdb_ind || "";
      detokenizeData["entry_status"] = req.headers.entry_status || "";
      detokenizeData["entry_bk_date"] = req.headers.entry_bk_date || "";
      detokenizeData["entry_bk_date_time"] = req.headers.entry_bk_date_time || "";
      detokenizeData["value_date"] = req.headers.value_date || "";
      detokenizeData["value_date_time"] = req.headers.value_date_time || "";
      detokenizeData["acct_serv_ref"] = req.headers.acct_serv_ref || "";
      detokenizeData["bank_code_prop"] = req.headers.bank_code_prop || "";
      detokenizeData["orig_amount"] = req.headers.orig_amount || "";
      detokenizeData["instd_amount"] = req.headers.instd_amount || "";
      detokenizeData["txn_amount"] = req.headers.txn_amount || "";
      detokenizeData["batch_msg_id"] = req.headers.batch_msg_id || "";
      detokenizeData["batch_txn_count"] = req.headers.batch_txn_count || "";
      detokenizeData["batch_tot_amount"] = req.headers.batch_tot_amount || "";
      detokenizeData["batch_crdb_ind"] = req.headers.batch_crdb_ind || "";
      detokenizeData["payment_info_id"] = req.headers.payment_info_id || "";
      detokenizeData["txn_ref_msgid"] = req.headers.txn_ref_msgid || "";
      detokenizeData["txn_accsvc_ref"] = req.headers.txn_accsvc_ref || "";
      detokenizeData["payment_info_instd_id"] = req.headers.payment_info_instd_id || "";
      detokenizeData["payment_info_ete_id"] = req.headers.payment_info_ete_id || "";
      detokenizeData["uetr"] = req.headers.uetr || "";
      detokenizeData["txn_id"] = req.headers.txn_id || "";
      detokenizeData["mandate_id"] = req.headers.mandate_id || "";
      detokenizeData["cheque_number"] = req.headers.cheque_number || "";
      detokenizeData["clr_system_ref"] = req.headers.clr_system_ref || "";
      detokenizeData["cash_txn_amount"] = req.headers.cash_txn_amount || "";
      detokenizeData["txn_crdb_ind"] = req.headers.txn_crdb_ind || "";
      detokenizeData["instructing_agent_id"] = req.headers.instructing_agent_id || "";
      detokenizeData["instructing_fin_inst_id"] = req.headers.instructing_fin_inst_id || "";
      detokenizeData["instructing_fin_inst_bic"] = req.headers.instructing_fin_inst_bic || "";
      detokenizeData["instructed_agent_id"] = req.headers.instructed_agent_id || "";
      detokenizeData["instructed_fin_inst_id"] = req.headers.instructed_fin_inst_id || "";
      detokenizeData["instructed_fin_inst_bic"] = req.headers.instructed_fin_inst_bic || "";
      detokenizeData["dbtr_id"] = req.headers.dbtr_id || "";
      detokenizeData["dbtr_bic"] = req.headers.dbtr_bic || "";
      detokenizeData["cdtr_id"] = req.headers.cdtr_id || "";
      detokenizeData["cdtr_bic"] = req.headers.cdtr_bic || "";
      detokenizeData["message_data"] = req.headers.message_data || "";
      detokenizeData["entry_ref_cur"] = req.headers.entry_ref_cur || "";
      detokenizeData["instd_cur"] = req.headers.instd_cur || "";
      detokenizeData["txn_cur"] = req.headers.txn_cur || "";
      detokenizeData["balance_cur"] = req.headers.balance_cur || "";
      detokenizeData["batch_cur"] = req.headers.batch_cur || "";
      detokenizeData["txn_dtls_cur"] = req.headers.txn_dtls_cur || "";
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
    const result = await this.npss_camt_acc_stmtService.findLast(token, detokenize,detokenizeData,req.authContext);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
  }

  @Post('/getlockbyid')
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: npss_camt_acc_stmtEntity, isArray: true })
  @ApiOperation({
    summary: 'Get record by id and lock it',
    description: 'Fetch a record by id and update trs_locked_by and trs_locked_time with current user and time',
  })
  async getLockById(@Body('key') key: string, @Body('value') value: any, @Req() req: any) {
    const token: string = req.headers.authorization.split(' ')[1];
    const result = await this.npss_camt_acc_stmtService.getLockById(key, value, token);
    return plainToInstance(npss_camt_acc_stmtEntity, result);
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
    const result = await this.npss_camt_acc_stmtService.releaseLockById(key, value, token);
    return result;
  }
}