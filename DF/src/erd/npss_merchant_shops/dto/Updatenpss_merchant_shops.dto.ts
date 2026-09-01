
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsBoolean } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatenpss_merchant_shopsDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        npssms_id?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        npssmp_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        product_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bankuserid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        shop_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        shop_mid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        shop_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        shop_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        shop_mcc?: string;
        @ApiPropertyOptional()
        @IsOptional()
        shop_iban?: string;
        @ApiPropertyOptional()
        @IsOptional()
        building?: string;
        @ApiPropertyOptional()
        @IsOptional()
        street?: string;
        @ApiPropertyOptional()
        @IsOptional()
        city?: string;
        @ApiPropertyOptional()
        @IsOptional()
        postal_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        county?: string;
        @ApiPropertyOptional()
        @IsOptional()
        country?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        exhf_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        shop_account_id?: string;
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

