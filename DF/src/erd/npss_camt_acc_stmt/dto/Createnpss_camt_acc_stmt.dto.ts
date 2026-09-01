
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createnpss_camt_acc_stmtDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        ncas_id: number;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_id?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        hdr_created_date_time?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_rcpt?: string;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_rcpt_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_rcpt_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_rcpt_orgid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_rcpt_org_bic?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        hdr_msg_pgnb?: number;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_last_pg_ind?: string;
        @ApiPropertyOptional()
        @IsOptional()
        hdr_msg_addtlinf?: string;
        @ApiPropertyOptional()
        @IsOptional()
        stmt_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        stmt_sequence_number?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_created_date_time?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_from_to_date_time?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_to_date_time?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        stmt_copy_dup_ind?: string;
        @ApiPropertyOptional()
        @IsOptional()
        acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        svcr_acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instn_acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        parent_acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        parent_svcr_acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        parent_inst_acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        balance_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        balance_type_code_prop?: string;
        @ApiPropertyOptional()
        @IsOptional()
        balance_type_prop?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        balance_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        balance_crdb_ind?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_bal_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_bal_date_time?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        balance_type_prop_1?: string;
        @ApiPropertyOptional()
        @IsOptional()
        balance_cur_1?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        balance_amount_1?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        balance_crdb_ind_1?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_bal_date_1?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        stmt_bal_date_time_1?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        count_indv_entries?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        sum_indv_entries?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        count_net_entries?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        sum_net_entries?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        net_crdb_ind?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tot_cr_entries?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        sum_cr_entries?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        tot_db_entries?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        sum_db_entries?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        entry_ref?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        entry_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        entry_crdb_ind?: string;
        @ApiPropertyOptional()
        @IsOptional()
        entry_status?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        entry_bk_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        entry_bk_date_time?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        value_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        value_date_time?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        acct_serv_ref?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_code_prop?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        orig_amount?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        instd_amount?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        txn_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        batch_msg_id?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        batch_txn_count?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        batch_tot_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        batch_crdb_ind?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_info_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        txn_ref_msgid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        txn_accsvc_ref?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_info_instd_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_info_ete_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        uetr?: string;
        @ApiPropertyOptional()
        @IsOptional()
        txn_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        mandate_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        cheque_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        clr_system_ref?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        cash_txn_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        txn_crdb_ind?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instructing_agent_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instructing_fin_inst_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instructing_fin_inst_bic?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instructed_agent_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instructed_fin_inst_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instructed_fin_inst_bic?: string;
        @ApiPropertyOptional()
        @IsOptional()
        dbtr_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        dbtr_bic?: string;
        @ApiPropertyOptional()
        @IsOptional()
        cdtr_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        cdtr_bic?: string;
        @ApiPropertyOptional()
        @IsOptional()
        message_data?: string;
        @ApiPropertyOptional()
        @IsOptional()
        entry_ref_cur?: string;
        @ApiPropertyOptional()
        @IsOptional()
        instd_cur?: string;
        @ApiPropertyOptional()
        @IsOptional()
        txn_cur?: string;
        @ApiPropertyOptional()
        @IsOptional()
        balance_cur?: string;
        @ApiPropertyOptional()
        @IsOptional()
        batch_cur?: string;
        @ApiPropertyOptional()
        @IsOptional()
        txn_dtls_cur?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_modified_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_modified_by?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_process_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_access_profile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_locked_time?: Date;
        @ApiProperty()
        @IsString()
        trs_tenant_id: string;
        @ApiProperty()
        @IsString()
        trs_app_code: string;
        @ApiProperty()
        @IsString()
        trs_product_code: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_token_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_version?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_prev_process_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_prev_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_prev_process_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_process_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_process_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_next_process_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_next_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_next_process_status?: string;

        
}

