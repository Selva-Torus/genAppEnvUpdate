
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createnpss_merchant_proxyDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        npssmp_id: number;
        @ApiPropertyOptional()
        @IsOptional()
        product_code?: string;
        @ApiProperty()
        @IsString()
        bankuserid: string;
        @ApiPropertyOptional()
        @IsOptional()
        group_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        merchant_tag?: string;
        @ApiPropertyOptional()
        @IsOptional()
        merchant_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        surname?: string;
        @ApiProperty()
        @IsString()
        denomination: string;
        @ApiProperty()
        @IsString()
        vat_number: string;
        @ApiProperty()
        @IsString()
        mcc: string;
        @ApiProperty()
        @IsString()
        mobile: string;
        @ApiPropertyOptional()
        @IsOptional()
        proxy_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        proxy_value?: string;
        @ApiPropertyOptional()
        @IsOptional()
        email?: string;
        @ApiPropertyOptional()
        @IsOptional()
        document_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        channel_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        logo?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        exhf_id?: number;
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
        operation_date?: string;
        @ApiPropertyOptional()
        @IsOptional()
        operation_type?: string;
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

