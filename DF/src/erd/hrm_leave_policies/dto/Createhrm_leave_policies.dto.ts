
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createhrm_leave_policiesDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        policy_id: number;
        @ApiProperty()
        policy_code: string;
        @ApiProperty()
        policy_name: string;
        @ApiProperty()
        leave_type: string;
        @ApiProperty({
            type: `number`,
            format: `decimal`,
        })
        days_per_year:  Prisma.Decimal;
        @ApiProperty({
            type: `number`,
            format: `decimal`,
        })
        carry_forward_days:  Prisma.Decimal;
        @ApiProperty()
        applicable_to: string;
        @ApiPropertyOptional()
        @IsOptional()
        gender_applicability?: string;
        @ApiPropertyOptional()
        @IsOptional()
        accrual_frequency?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        max_consecutive_days?: number;
        @ApiProperty()
        approval_required: boolean;
        @ApiProperty()
        encashment_allowed: boolean;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        carry_forward_expiry?: number;
        @ApiPropertyOptional()
        @IsOptional()
        applicable_locations?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        policy_rules_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        accrual_rules_json?: Prisma.InputJsonValue;
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

        
}

