
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsBoolean } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatenpss_sm_process_logDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        npsssmpl_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        bankuserid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        process_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        processing_system?: string;
        @ApiPropertyOptional()
        @IsOptional()
        result_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        result?: string;
        @ApiPropertyOptional()
        @IsOptional()
        result_message?: string;
        @ApiPropertyOptional()
        @IsOptional()
        result_x_request_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        process_ref_no?: string;
        @ApiPropertyOptional()
        @IsOptional()
        request_data_json?: string;
        @ApiPropertyOptional()
        @IsOptional()
        response_data_json?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_refno?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_userid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_product?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_sub_product?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_tran_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        reject_reason_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        reject_reason?: string;
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
        @ApiPropertyOptional()
        @IsOptional()
        trs_tenant_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_app_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_product_code?: string;
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

