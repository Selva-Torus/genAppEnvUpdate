
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsBoolean } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatenpss_core_api_process_logDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        npsscapl_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        process_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        processing_system?: string;
        @ApiPropertyOptional()
        @IsOptional()
        response_code?: string;
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
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        accountholderbic?: string;
        @ApiPropertyOptional()
        @IsOptional()
        accountnumber?: string;
        @ApiPropertyOptional()
        @IsOptional()
        datasource?: string;
        @ApiPropertyOptional()
        @IsOptional()
        senderbic?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        fromdate?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        todate?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        reftype?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ref?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        datetime?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        cyclenumber?: string;
        @ApiPropertyOptional()
        @IsOptional()
        pl_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        fromtime?: string;
        @ApiPropertyOptional()
        @IsOptional()
        totime?: string;
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

