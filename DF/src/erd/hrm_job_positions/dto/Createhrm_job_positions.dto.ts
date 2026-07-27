
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createhrm_job_positionsDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        position_id: number;
        @ApiProperty()
        position_code: string;
        @ApiProperty()
        position_title: string;
        @ApiPropertyOptional()
        @IsOptional()
        description?: string;
        @ApiProperty()
        employment_type: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        experience_required?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        salary_range_min?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        salary_range_max?:  Prisma.Decimal;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        headcount: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        approved_headcount: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        filled_headcount: number;
        @ApiProperty()
        is_open: boolean;
        @ApiProperty()
        vacancy_status: string;
        @ApiProperty()
        remote_allowed: boolean;
        @ApiProperty()
        travel_required: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        job_family?: string;
        @ApiPropertyOptional()
        @IsOptional()
        job_level?: string;
        @ApiPropertyOptional()
        @IsOptional()
        additional_details?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        secure_data?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        doc_url?: string[];
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        trs_created_date: Date;
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
        trs_tenant_id: string;
        @ApiProperty()
        trs_app_code: string;
        @ApiProperty()
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
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        grade_id: number;

        
}

