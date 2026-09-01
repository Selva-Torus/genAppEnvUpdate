
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createvgph_participant_bank_statusDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        vgphbpbs_id: number;
        @ApiProperty()
        @IsString()
        bank_name: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_short_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bic_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        availability_flag?: string;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        @IsDateString()
        from_date_time: Date;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        @IsDateString()
        to_date_time: Date;
        @ApiPropertyOptional()
        @IsOptional()
        status_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        send_receive?: string;
        @ApiPropertyOptional()
        @IsOptional()
        receive_only?: string;
        @ApiPropertyOptional()
        @IsOptional()
        request_for_pay?: string;
        @ApiPropertyOptional()
        @IsOptional()
        rct_subscription?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bct_subscription?: string;
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

        
}

