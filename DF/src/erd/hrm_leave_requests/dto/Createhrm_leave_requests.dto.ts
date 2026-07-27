
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createhrm_leave_requestsDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        leave_req_id: number;
        @ApiProperty()
        leave_request_number: string;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        start_date: Date;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        end_date: Date;
        @ApiProperty({
            type: `number`,
            format: `decimal`,
        })
        days_requested:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        reason?: string;
        @ApiPropertyOptional()
        @IsOptional()
        leave_reason_category?: string;
        @ApiPropertyOptional()
        @IsOptional()
        half_day_flag?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        half_day_session?: string;
        @ApiProperty()
        emergency_leave: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        contact_during_leave?: string;
        @ApiPropertyOptional()
        @IsOptional()
        handover_notes?: string;
        @ApiPropertyOptional()
        @IsOptional()
        attachment_urls?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        cancellation_reason?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        cancelled_by?: number;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        cancelled_at?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        rejection_reason?: string;
        @ApiPropertyOptional()
        @IsOptional()
        approval_comments?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        leave_balance_before?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        leave_balance_afterd?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        additional_details?: Prisma.InputJsonValue;
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
        employee_id: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        policy_id: number;

        
}

