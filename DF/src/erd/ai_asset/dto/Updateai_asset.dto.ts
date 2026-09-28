
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsBoolean } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updateai_assetDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        ai_asset_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        asset_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        asset_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        asset_type_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        short_description?: string;
        @ApiPropertyOptional()
        @IsOptional()
        use_case_code?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        business_unit_id?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        business_owner_id?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        technical_owner_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        vendor_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        @IsBoolean()
        is_third_party?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        hosting_location?: string;
        @ApiPropertyOptional()
        @IsOptional()
        risk_tier_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        risk_tier_source?: string;
        @ApiPropertyOptional()
        @IsOptional()
        criticality_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        lifecycle_status_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        @IsBoolean()
        is_customer_facing?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        @IsBoolean()
        is_automated_decision?: boolean;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        current_certification_id?: number;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        cert_expiry_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        discovery_source_code?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        integration_source_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        external_reference?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        first_discovered_on?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        last_seen_on?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        go_live_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        retirement_date?: Date;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        current_version_no?: number;
        @ApiPropertyOptional()
        @IsOptional()
        @IsBoolean()
        is_active?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        business_unit_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        business_owner_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        business_owner_job_title?: string;
        @ApiPropertyOptional()
        @IsOptional()
        technical_owner_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        technical_owner_job_title?: string;
        @ApiPropertyOptional()
        @IsOptional()
        business_purpose?: string;
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
}

