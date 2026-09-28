
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createcert_template_stageDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        template_stage_id: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsInt()
        stage_sequence: number;
        @ApiProperty()
        @IsString()
        stage_type_code: string;
        @ApiProperty()
        @IsString()
        stage_name: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsInt()
        approver_role_id: number;
        @ApiProperty()
        @IsBoolean()
        is_mandatory: boolean;
        @ApiProperty()
        @IsBoolean()
        evidence_required: boolean;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsInt()
        min_evidence_count: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsInt()
        sla_days: number;
        @ApiPropertyOptional()
        @IsOptional()
        guidance_text?: string;
        @ApiProperty()
        @IsBoolean()
        is_active: boolean;
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
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        cert_template_id: number;

        
}

