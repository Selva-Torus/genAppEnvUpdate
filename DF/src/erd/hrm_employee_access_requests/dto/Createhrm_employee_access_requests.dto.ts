
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createhrm_employee_access_requestsDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        access_req_id: number;
        @ApiProperty()
        request_number: string;
        @ApiProperty()
        request_type: string;
        @ApiProperty()
        system_name: string;
        @ApiPropertyOptional()
        @IsOptional()
        access_role?: string;
        @ApiPropertyOptional()
        @IsOptional()
        access_level?: string;
        @ApiProperty()
        business_justification: string;
        @ApiProperty()
        request_priority: string;
        @ApiPropertyOptional()
        @IsOptional()
        risk_level?: string;
        @ApiPropertyOptional()
        @IsOptional()
        approval_comments?: string;
        @ApiPropertyOptional()
        @IsOptional()
        rejection_reason?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        valid_from?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        valid_to?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        access_expiry_date?: Date;
        @ApiProperty()
        provisioning_status: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        provisioned_at?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        provisioning_reference?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ticket_reference?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        revoked_at?: Date;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        revoked_by?: number;
        @ApiPropertyOptional()
        @IsOptional()
        revoked_reason?: string;
        @ApiProperty()
        access_review_required: boolean;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        last_reviewed_at?: Date;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        reviewed_by?: number;
        @ApiPropertyOptional()
        @IsOptional()
        attachments_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        audit_metadata?: Prisma.InputJsonValue;
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
        employee_id: number;

        
}

