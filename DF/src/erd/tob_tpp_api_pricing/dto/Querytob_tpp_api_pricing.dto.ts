import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';


 

export class Querytob_tpp_api_pricingDto{
    @ApiProperty()
    @IsString()
    record_id : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tpp_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tpp_name? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    api_type? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    api_name? : string;
    @ApiPropertyOptional()
    @IsOptional()
    total_calls?: number;
    @ApiPropertyOptional()
    @IsOptional()
    successful_calls?: number;
    @ApiPropertyOptional()
    @IsOptional()
    billable_calls?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    pricing_id? : string;
    @ApiPropertyOptional()
    @IsOptional()
    base_fee?: number;
    @ApiPropertyOptional()
    @IsOptional()
    usage_charge?: number;
    @ApiPropertyOptional()
    @IsOptional()
    overage_charge?: number;
    @ApiPropertyOptional()
    @IsOptional()
    total_charge?: number;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    billing_month? : Date;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    currency? : string;
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
    @ApiProperty()
    trs_app_code:  string;
    @ApiPropertyOptional()
    @IsOptional()
    trs_locked_by?:  string;
    @ApiPropertyOptional({
    type: `string`,
    format: `date-time`,
    })
    @IsOptional()
    trs_locked_time?:  Date;
    @ApiProperty({example:"string"})
    trs_tenant_id: string;
    @ApiProperty({example:"string"})
    trs_product_code: string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_process_status?: string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_status?: string;
}
