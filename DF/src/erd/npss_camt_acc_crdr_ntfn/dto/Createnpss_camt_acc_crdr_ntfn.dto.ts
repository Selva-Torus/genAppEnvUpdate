
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createnpss_camt_acc_crdr_ntfnDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        ncacn_id: number;
        @ApiPropertyOptional()
        @IsOptional()
        header_msg_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        notification_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ntfn_created_datetime?: string;
        @ApiPropertyOptional()
        @IsOptional()
        iban?: string;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        limit_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        cr_dr_indicator?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ntfn_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        booking_datetime?: string;
        @ApiPropertyOptional()
        @IsOptional()
        end_to_end_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        message_data?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ntfn_account_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        account_type_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_tran_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_domain_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_tran_prop_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        dbtr_acct_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        cdtr_acct_id?: string;
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

