
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createams_assetsDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        asset_id: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        ci_id?: number;
        @ApiProperty()
        asset_tag: string;
        @ApiPropertyOptional()
        @IsOptional()
        asset_code?: string;
        @ApiProperty()
        asset_name: string;
        @ApiPropertyOptional()
        @IsOptional()
        description?: string;
        @ApiPropertyOptional()
        @IsOptional()
        serial_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        model_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        manufacturer?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        purchase_date?: Date;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        purchase_cost?:  Prisma.Decimal;
        @ApiProperty()
        currency: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        vendor_id?: number;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        warranty_expiry?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        warranty_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        insurance_status?: string;
        @ApiProperty()
        asset_type: string;
        @ApiProperty()
        classification: string;
        @ApiPropertyOptional()
        @IsOptional()
        data_classification?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ownership_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        lifecycle_stage?: string;
        @ApiPropertyOptional()
        @IsOptional()
        asset_condition?: string;
        @ApiProperty()
        is_critical: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        compliance_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        risk_level?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        purchase_value?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        current_value?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        depreciation_rate?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        salvage_value?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        disposal_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        disposal_method?: string;
        @ApiPropertyOptional()
        @IsOptional()
        disposal_ref?: string;
        @ApiPropertyOptional()
        @IsOptional()
        asset_metadata?: Prisma.InputJsonValue;
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
        acat_id: number;

        
}

