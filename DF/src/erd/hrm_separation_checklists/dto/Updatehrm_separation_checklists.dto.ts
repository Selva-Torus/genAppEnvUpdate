
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatehrm_separation_checklistsDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        checklist_id?: number;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        resignation_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        last_working_day?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        checklist_items?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        access_revoked?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        assets_returned?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        hr_clearance?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        separation_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        resignation_reason?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        exit_interview_rating?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        final_settlement_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        additional_details?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        doc_url?: string[];
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








        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        employee_id: number;















}

